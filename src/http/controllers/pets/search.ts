import { Age, EnergyLevel, Size, Species } from '@/enums/pets';
import { makeSearchPetsUseCase } from '@/use-cases/factories/makeSearchPets';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchParamsSchema = z.object({
        city: z.string(),
        species: z.enum([
            Species.Dog,
            Species.Cat,
            Species.Bird,
            Species.Rabbit,
            Species.Fish,
            Species.Rodent,
        ]),
        age: z.enum([Age.Puppy, Age.Adult, Age.Senior]),
        size: z.enum([Size.Small, Size.Medium, Size.Large, Size.Giant]),
        energy_level: z.enum([
            EnergyLevel.Low,
            EnergyLevel.Medium,
            EnergyLevel.High,
        ]),
    });

    const params = searchParamsSchema.parse(request.params);

    const searchUseCase = makeSearchPetsUseCase();

    const { pets } = await searchUseCase.handle(params);

    return reply.status(200).send({ pets });
}
