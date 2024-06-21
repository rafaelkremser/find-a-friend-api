import { Prisma, Pet } from '@prisma/client';
import * as enums from '@/enums/pets';

export interface FindManyParams {
    city: string;
    species?: enums.Species;
    age?: enums.Age;
    size?: enums.Size;
    energy_level?: enums.EnergyLevel;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findById(id: string): Promise<Pet | null>;
    findMany(params: FindManyParams): Promise<Pet[]>;
}
