import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/inMemoryOrganizationsRepository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/inMemoryPetsRepository';
import { describe, it, expect, beforeEach } from 'vitest';
import { CreatePetUseCase } from './createPet';
import { Age, EnergyLevel, Size, Species } from '@/enums/pets';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

describe('Create Pet Use Case', () => {
    let petsRepository: InMemoryPetsRepository;
    let organizationsRepository: InMemoryOrganizationsRepository;
    let sut: CreatePetUseCase;

    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository(organizationsRepository);
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new CreatePetUseCase(petsRepository, organizationsRepository);

        await organizationsRepository.create({
            id: 'org-01',
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });
    });

    it('should be able to register a pet', async () => {
        const { pet } = await sut.handle({
            name: 'Justin',
            about: 'A funny dog',
            species: Species.Dog,
            age: Age.Puppy,
            size: Size.Medium,
            energy_level: EnergyLevel.High,
            organization_id: 'org-01',
        });

        expect(pet.id).toEqual(expect.any(String));
    });

    it('should be able to register a pet', async () => {
        await expect(() =>
            sut.handle({
                name: 'Justin',
                about: 'A funny dog',
                species: Species.Dog,
                age: Age.Puppy,
                size: Size.Medium,
                energy_level: EnergyLevel.High,
                organization_id: 'org-02',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
