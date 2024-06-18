import { OrganizationsRepository } from '@/repositories/organizationsRepository';
import { Organization } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/orgAlreadyExists';

interface RegisterOrganizationUseCaseRequest {
    ownerName: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    latitude: number;
    longitude: number;
}

interface RegisterUseCaseResponse {
    organization: Organization;
}

export class RegisterOrganizationUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async handle({
        ownerName,
        email,
        password,
        phone,
        city,
        latitude,
        longitude,
    }: RegisterOrganizationUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6);

        const orgWithSameEmail = await this.organizationsRepository.findByEmail(
            email
        );

        if (orgWithSameEmail) {
            throw new OrgAlreadyExistsError();
        }

        const organization = await this.organizationsRepository.create({
            ownerName,
            email,
            password_hash,
            phone,
            city,
            latitude,
            longitude,
        });

        return { organization };
    }
}
