import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository';
import { GetPetUseCase } from '../getPetDetails';

export function makeGetPetUseCase() {
    const petsRepository = new PrismaPetsRepository();
    const getPetDetailsUseCase = new GetPetUseCase(petsRepository);

    return getPetDetailsUseCase;
}
