import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/InMemoryOrganizationsRepository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/InMemoryPetsRepository';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CreatePetUseCase } from './createPet';

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository();
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new CreatePetUseCase(petsRepository, organizationsRepository);

        await organizationsRepository.create({
            id: 'org-01',
            ownerName: 'Jonh Doe',
            email: 'jonhdoe@email.com',
            password_hash: '123456',
            phone: '11999999999',
            latitude: -19.9353832,
            longitude: -44.0103913,
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to register a pet', async () => {
        const { pet } = await sut.handle({
            name: 'Justin',
            about: 'A funny dog',
            species: 'dog',
            organizationId: 'org-01',
        });

        expect(pet.id).toEqual(expect.any(String));
    });
});
