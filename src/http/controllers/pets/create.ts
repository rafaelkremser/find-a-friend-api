import { Age, EnergyLevel, Size, Species } from '@/enums/pets';
import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFoundError';
import { makeCreatePetUseCase } from '@/use-cases/factories/makeCreatePet';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const requestBodyResponse = z.object({
        name: z.string(),
        about: z.string().optional(),
        species: z.enum(['dog', 'cat', 'bird', 'rabbit', 'fish', 'rodent']),
        age: z.enum(['puppy', 'adult', 'senior']),
        size: z.enum(['small', 'medium', 'large', 'giant']),
        energy_level: z.enum(['low', 'medium', 'high']),
        organization_id: z.string().uuid(),
    });

    const body = requestBodyResponse.parse(request.body);

    try {
        const createPetUseCase = makeCreatePetUseCase();

        await createPetUseCase.handle(body);

        return reply.status(201).send();
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }

        throw err;
    }
}
