import { makeSearchPetsUseCase } from '@/use-cases/factories/makeSearchPets';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchQuerySchema = z.object({
        city: z.string(),
        species: z
            .enum(['dog', 'cat', 'bird', 'rabbit', 'fish', 'rodent'])
            .optional(),
        age: z.enum(['puppy', 'adult', 'senior']).optional(),
        size: z.enum(['small', 'medium', 'large', 'giant']).optional(),
        energy_level: z.enum(['low', 'medium', 'high']).optional(),
    });

    const query = searchQuerySchema.parse(request.query);

    const searchUseCase = makeSearchPetsUseCase();

    const { pets } = await searchUseCase.handle(query);

    return reply.status(200).send({ pets });
}
