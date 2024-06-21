import { PrismaOrganizationsRepository } from '@/repositories/prisma/prismaOrganizationsRepository';
import { RegisterOrganizationUseCase } from '../registerOrganization';

export function makeRegisterUseCase() {
    const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
    const registerUseCase = new RegisterOrganizationUseCase(
        prismaOrganizationsRepository
    );

    return registerUseCase;
}
