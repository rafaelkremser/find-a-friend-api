import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateOrg } from '@/utils/test/createAndAuthenticateOrg';

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to search gyms by title', async () => {
        const { org, token } = await createAndAuthenticateOrg(app);

        await request(app.server)
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

        await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Ada',
                species: 'cat',
                age: 'adult',
                size: 'medium',
                energy_level: 'low',
                organization_id: org.id,
            });

        const searchPetsResponse = await request(app.server)
            .get('/pets/search')
            .query({
                city: 'Belo Horizonte',
                species: 'cat',
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(searchPetsResponse.statusCode).toEqual(200);
        expect(searchPetsResponse.body.pets).toHaveLength(1);
        expect(searchPetsResponse.body.pets).toEqual([
            expect.objectContaining({
                name: 'Ada',
            }),
        ]);
    });
});
