import { OrganizationsRepository } from '@/repositories/organizationsRepository';
import { Organization } from '@prisma/client';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalidCredentialsError';

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    organization: Organization;
}

export class AuthenticateUseCase {
    constructor(private organizationsRepository: OrganizationsRepository) {}

    async handle({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const organization = await this.organizationsRepository.findByEmail(
            email
        );

        if (!organization) {
            throw new InvalidCredentialsError();
        }

        const doestPasswordMatches = await compare(
            password,
            organization.password_hash
        );

        if (!doestPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { organization };
    }
}
