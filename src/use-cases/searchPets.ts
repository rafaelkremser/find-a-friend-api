import { Age, EnergyLevel, Size, Species } from '@/enums/pets';
import { PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';

interface SearchPetsUseCaseRequest {
    city: string;
    species?: string;
    age?: string;
    size?: string;
    energy_level?: string;
}

interface SearchPetsUseCaseResponse {
    pets: Pet[];
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async handle({
        city,
        species,
        age,
        size,
        energy_level,
    }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
        const pets = await this.petsRepository.findMany({
            city,
            species,
            age,
            size,
            energy_level,
        });

        return {
            pets,
        };
    }
}
