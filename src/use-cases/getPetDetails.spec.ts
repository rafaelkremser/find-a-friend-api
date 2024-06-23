import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/inMemoryOrganizationsRepository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/inMemoryPetsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetPetUseCase } from './getPetDetails';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

describe('Get Pet Details Use Case', () => {
    let organizationsRepository: InMemoryOrganizationsRepository;
    let petsRepository: InMemoryPetsRepository;
    let sut: GetPetUseCase;

    beforeEach(async () => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        petsRepository = new InMemoryPetsRepository(organizationsRepository);
        sut = new GetPetUseCase(petsRepository);

        await organizationsRepository.create({
            id: 'org-01',
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });
    });

    it('should be able to get a pet details', async () => {
        await petsRepository.create({
            id: 'pet-01',
            name: 'Leon',
            species: 'dog',
            age: 'puppy',
            size: 'giant',
            energy_level: 'high',
            organization_id: 'org-01',
        });

        const pet = await sut.handle({ id: 'pet-01' });

        expect(pet.pet).toMatchObject({ name: 'Leon' });
    });

    it('should be able to get a pet details with wrong id', async () => {
        await expect(() =>
            sut.handle({
                id: 'wrong id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
