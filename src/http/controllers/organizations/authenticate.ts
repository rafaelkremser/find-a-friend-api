import { InvalidCredentialsError } from '@/use-cases/errors/invalidCredentialsError';
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticate';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestBodyResponse = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const body = requestBodyResponse.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    try {
        const { organization } = await authenticateUseCase.handle(body);

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: organization.id,
                },
            }
        );

        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: organization.id,
                    expiresIn: '7d',
                },
            }
        );

        return reply
            .status(200)
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                httpOnly: true,
            })
            .send({ token });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }
}
