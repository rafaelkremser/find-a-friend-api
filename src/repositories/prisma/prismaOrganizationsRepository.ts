import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { OrganizationsRepository } from '../organizationsRepository';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput) {
        const org = await prisma.organization.create({
            data,
        });

        return org;
    }

    async findByEmail(email: string) {
        const org = await prisma.organization.findUnique({
            where: { email },
        });

        return org;
    }

    async findById(id: string) {
        const org = await prisma.organization.findFirst({
            where: { id },
        });

        return org;
    }
}
