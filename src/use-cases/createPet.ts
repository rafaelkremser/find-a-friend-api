import { OrganizationsRepository } from '@/repositories/organizationsRepository';
import { PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface CreatePetUseCaseRequest {
    name: string;
    about?: string;
    species: string;
    age: string;
    size: string;
    energy_level: string;
    organization_id: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet;
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private organizationsRepository: OrganizationsRepository
    ) {}

    async handle({
        name,
        about,
        species,
        age,
        size,
        energy_level,
        organization_id,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const organization = await this.organizationsRepository.findById(
            organization_id
        );

        if (!organization) {
            throw new ResourceNotFoundError();
        }

        const pet = await this.petsRepository.create({
            name,
            about,
            species,
            age,
            size,
            energy_level,
            organization_id,
        });

        return { pet };
    }
}
