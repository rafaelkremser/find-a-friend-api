import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true });

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.id,
            },
        }
    );

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.id,
                expiresIn: '7d',
            },
        }
    );

    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .status(200)
        .send({
            token,
        });
}
