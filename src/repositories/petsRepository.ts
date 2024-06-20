import { Prisma, Pet } from '@prisma/client';

export interface FindManyParams {
    city: string;
    species?: string;
    age?: string;
    size?: string;
    energy_level?: string;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findById(id: string): Promise<Pet | null>;
    findMany(params: FindManyParams): Promise<Pet[]>;
}
