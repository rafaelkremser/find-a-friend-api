import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to register a organization', async () => {
        const response = await request(app.server).post('/organizations').send({
            ownerName: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
            phone: '11999999999',
            city: 'Belo Horizonte',
        });

        expect(response.statusCode).toEqual(201);
    });
});
