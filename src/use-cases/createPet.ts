import { OrganizationsRepository } from '@/repositories/organizationsRepository';
import { PetsRepository } from '@/repositories/petsRepository';
import { Pet } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface CreatePetUseCaseRequest {
    name: string;
    about: string | null;
    species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'fish' | 'rodent';
    organizationId: string;
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
        organizationId,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const organization = await this.organizationsRepository.findById(
            organizationId
        );

        if (!organization) {
            throw new ResourceNotFoundError();
        }

        const pet = await this.petsRepository.create({
            name,
            about,
            species,
            organization_id: organizationId,
        });

        return { pet };
    }
}
