import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';
import { prisma } from '@/lib/prisma';

describe('Get Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to a pet', async () => {
        const { org, token } = await createAndAuthenticateOrg(app);

        const pet = await prisma.pet.create({
            data: {
                name: 'Leon',
                species: 'dog',
                age: 'puppy',
                size: 'giant',
                energy_level: 'high',
                organization_id: org.id,
            },
        });

        const getPetResponse = await request(app.server)
            .get(`/pets/${pet.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(getPetResponse.statusCode).toEqual(200);
    });
});
