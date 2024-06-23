import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';

describe('Create Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create a pet', async () => {
        const { org, token } = await createAndAuthenticateOrg(app);

        const createPetResponse = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Leon',
                species: 'dog',
                age: 'puppy',
                size: 'giant',
                energy_level: 'high',
                organization_id: org.id,
            });

        expect(createPetResponse.statusCode).toEqual(201);
    });
});
