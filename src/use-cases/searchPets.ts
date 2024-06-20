import { FindManyParams, PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';

interface SearchPetsRequest {
    params: FindManyParams;
}

interface SearchPetsResponse {
    pets: Pet[];
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async handle({ params }: SearchPetsRequest): Promise<SearchPetsResponse> {
        const pets = await this.petsRepository.findMany(params);

        return {
            pets,
        };
    }
}
