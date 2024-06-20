import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/inMemoryOrganizationsRepository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalidCredentialsError';

describe('Authenticate Use Case', () => {
    let organizationsRepository: InMemoryOrganizationsRepository;
    let sut: AuthenticateUseCase;

    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new AuthenticateUseCase(organizationsRepository);
    });

    it('should be able to authenticate', async () => {
        await organizationsRepository.create({
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: await hash('123456', 6),
            phone: '11999999999',
            city: 'Belo Horizonte',
            latitude: -19.9353832,
            longitude: -44.0103913,
        });

        const { organization } = await sut.handle({
            email: 'jonhdoe@email.com',
            password: '123456',
        });

        expect(organization.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            sut.handle({
                email: 'email@email.com',
                password: '12',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await organizationsRepository.create({
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: await hash('123456', 6),
            phone: '11999999999',
            city: 'Belo Horizonte',
            latitude: -19.9353832,
            longitude: -44.0103913,
        });

        await expect(() =>
            sut.handle({
                email: 'jonhdoe@email.com',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
