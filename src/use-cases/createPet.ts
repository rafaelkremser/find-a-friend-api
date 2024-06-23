import { OrganizationsRepository } from '@/repositories/organizationsRepository';
import { PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';
import { Age, EnergyLevel, Size, Species } from '../enums/pets';

interface CreatePetUseCaseRequest {
    name: string;
    about: string | null;
    species: Species;
    age: Age;
    size: Size;
    energy_level: EnergyLevel;
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
