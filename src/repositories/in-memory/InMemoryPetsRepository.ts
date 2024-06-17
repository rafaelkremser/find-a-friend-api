import { Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PetsRepository } from '../petsRepository';

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about ?? null,
            species: data.species,
            created_at: new Date(),
            organization_id: data.organization_id,
        };

        this.items.push(pet);

        return pet;
    }
}
