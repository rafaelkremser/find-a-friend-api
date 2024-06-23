import { PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface GetPetUseCaseRequest {
    id: string;
}

interface GetPetUseCaseResponse {
    pet: Pet;
}

export class GetPetUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async handle({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
        const pet = await this.petsRepository.findById(id);

        if (!pet) {
            throw new ResourceNotFoundError();
        }

        return {
            pet,
        };
    }
}
