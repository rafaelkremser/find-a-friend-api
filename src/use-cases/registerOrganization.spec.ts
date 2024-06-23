import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterOrganizationUseCase } from './registerOrganization';
import { compare } from 'bcryptjs';
import { OrgAlreadyExistsError } from './errors/orgAlreadyExists';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/inMemoryOrganizationsRepository';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new RegisterOrganizationUseCase(organizationsRepository);
    });

    it('should be able to register a organization', async () => {
        const { organization } = await sut.handle({
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });

        expect(organization.id).toEqual(expect.any(String));
    });

    it('should hash org password upon registration', async () => {
        const { organization } = await sut.handle({
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            organization.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const email = 'jonhdoe@email.com';

        await sut.handle({
            ownerName: 'Jonh Doe',
            email,
            password: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });

        await expect(() =>
            sut.handle({
                ownerName: 'Jonh Doe',
                email,
                password: '123456',
                phone: '11999999999',
                city: 'Belo Horizonte',
            })
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
    });
});
