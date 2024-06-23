import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFoundError';
import { makeGetPetUseCase } from '@/use-cases/factories/makeGetPetDetails';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
    const getPetParamsSchema = z.object({
        id: z.string().uuid(),
    });

    const params = getPetParamsSchema.parse(request.params);

    try {
        const getPetUseCase = makeGetPetUseCase();

        const { pet } = await getPetUseCase.handle(params);

        return reply.status(200).send(pet);
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        throw err;
    }
}
