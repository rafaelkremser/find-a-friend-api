import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository';
import { CreatePetUseCase } from '../createPet';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository';

export function makeCreatePetUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const orgsRepository = new PrismaOrganizationsRepository();
    const createPetUseCase = new CreatePetUseCase(
        petsRepository,
        orgsRepository
    );

    return createPetUseCase;
}
