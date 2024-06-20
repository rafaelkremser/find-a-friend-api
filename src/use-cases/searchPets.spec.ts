import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/inMemoryOrganizationsRepository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/inMemoryPetsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SearchPetsUseCase } from './searchPets';

describe('Search Pets Use Case', () => {
    let organizationsRepository: InMemoryOrganizationsRepository;
    let petsRepository: InMemoryPetsRepository;
    let sut: SearchPetsUseCase;

    beforeEach(async () => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        petsRepository = new InMemoryPetsRepository(organizationsRepository);
        sut = new SearchPetsUseCase(petsRepository);

        await organizationsRepository.create({
            id: 'org-01',
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
            latitude: -19.9353832,
            longitude: -44.0103913,
        });
        await organizationsRepository.create({
            id: 'org-02',
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: '123456',
            phone: '11999999999',
            city: 'Catas Altas',
            latitude: -19.9353832,
            longitude: -44.0103913,
        });
    });

    it('should be able to search pets by city', async () => {
        await petsRepository.create({
            name: 'Leon',
            species: 'dog',
            age: 'puppy',
            size: 'giant',
            energy_level: 'high',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Freud',
            species: 'cat',
            age: 'adult',
            size: 'small',
            energy_level: 'low',
            organization_id: 'org-02',
        });

        const pets = await sut.handle({ city: 'Belo Horizonte' });

        expect(pets.pets).toHaveLength(1);
        expect(pets.pets[0]).toMatchObject({
            name: 'Leon',
        });
    });

    it('should be able to search pets by city and species', async () => {
        await petsRepository.create({
            name: 'Leon',
            species: 'dog',
            age: 'puppy',
            size: 'giant',
            energy_level: 'high',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Freud',
            species: 'cat',
            age: 'adult',
            size: 'small',
            energy_level: 'low',
            organization_id: 'org-01',
        });

        const pets = await sut.handle({
            city: 'Belo Horizonte',
            species: 'cat',
        });

        expect(pets.pets).toHaveLength(1);
        expect(pets.pets[0]).toMatchObject({
            name: 'Freud',
        });
    });

    it('should be able to search pets by city, species and size', async () => {
        await petsRepository.create({
            name: 'Leon',
            species: 'dog',
            age: 'puppy',
            size: 'giant',
            energy_level: 'high',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Freud',
            species: 'cat',
            age: 'adult',
            size: 'small',
            energy_level: 'low',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Bolt',
            species: 'dog',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            organization_id: 'org-01',
        });

        const pets = await sut.handle({
            city: 'Belo Horizonte',
            species: 'dog',
            size: 'medium',
        });

        expect(pets.pets).toHaveLength(1);
        expect(pets.pets[0]).toMatchObject({
            name: 'Bolt',
        });
    });

    it('should be able to search pets by city, species, size and energy level', async () => {
        await petsRepository.create({
            name: 'Leon',
            species: 'dog',
            age: 'puppy',
            size: 'giant',
            energy_level: 'high',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Freud',
            species: 'cat',
            age: 'adult',
            size: 'small',
            energy_level: 'low',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Bolt',
            species: 'dog',
            age: 'adult',
            size: 'medium',
            energy_level: 'high',
            organization_id: 'org-01',
        });
        await petsRepository.create({
            name: 'Bubble',
            species: 'dog',
            age: 'adult',
            size: 'medium',
            energy_level: 'low',
            organization_id: 'org-01',
        });

        const pets = await sut.handle({
            city: 'Belo Horizonte',
            species: 'dog',
            size: 'medium',
            energy_level: 'low',
        });

        expect(pets.pets).toHaveLength(1);
        expect(pets.pets[0]).toMatchObject({
            name: 'Bubble',
        });
    });
});
