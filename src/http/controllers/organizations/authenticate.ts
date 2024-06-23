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

        return reply.status(200).send({ token });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error;
    }
}
