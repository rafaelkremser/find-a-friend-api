import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { FindManyParams, PetsRepository } from '../petsRepository';

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        });

        return pet;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findFirst({
            where: { id },
        });

        return pet;
    }

    async findMany(params: FindManyParams) {
        const pets = await prisma.pet.findMany({
            where: {
                AND: {
                    organization: { city: params.city },
                    OR: [
                        { species: params.species },
                        { age: params.age },
                        { size: params.size },
                        { energy_level: params.energy_level },
                    ],
                },
            },
        });

        return pets;
    }
}
