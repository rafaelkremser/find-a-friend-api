import { Organization, Prisma } from '@prisma/client';
import { OrganizationsRepository } from '../organizationsRepository';
import { randomUUID } from 'crypto';

export class InMemoryOrganizationsRepository
    implements OrganizationsRepository
{
    public items: Organization[] = [];

    async create(data: Prisma.OrganizationCreateInput) {
        const org = {
            id: data.id ?? randomUUID(),
            ownerName: data.ownerName,
            email: data.email,
            password_hash: data.password_hash,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        };

        this.items.push(org);

        return org;
    }

    async findByEmail(email: string) {
        const org = this.items.find((org) => org.email === email);

        if (!org) {
            return null;
        }

        return org;
    }
}
