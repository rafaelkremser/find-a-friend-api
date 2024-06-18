import { Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { FindManyParams, PetsRepository } from '../petsRepository';
import { InMemoryOrganizationsRepository } from './inMemoryOrganizationsRepository';

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];

    constructor(
        private organizationsRepository: InMemoryOrganizationsRepository
    ) {}

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about ?? null,
            species: data.species,
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            created_at: new Date(),
            organization_id: data.organization_id,
        };

        this.items.push(pet);

        return pet;
    }

    async findMany(params: FindManyParams) {
        const orgsByCity = this.organizationsRepository.items.filter(
            (org) => org.city === params.city
        );
        const pets = this.items
            .filter((pet) =>
                orgsByCity.some((org) => org.id === pet.organization_id)
            )
            .filter((pet) =>
                params.species ? pet.species.includes(params.species) : true
            )
            .filter((pet) => (params.age ? pet.age.includes(params.age) : true))
            .filter((pet) =>
                params.size ? pet.size.includes(params.size) : true
            )
            .filter((pet) =>
                params.energy_level
                    ? pet.energy_level.includes(params.energy_level)
                    : true
            );

        return pets;
    }
}
