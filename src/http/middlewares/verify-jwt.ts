import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        if (!request.headers.authorization) {
            throw new Error();
        }

        await request.jwtVerify();
    } catch {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
}
