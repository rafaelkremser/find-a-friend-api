import { FastifyInstance } from 'fastify';
import { create } from './create';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { getPet } from './getPet';
import { search } from './search';

export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets/:id', getPet);
    app.get('/pets/search', search);

    // authenticate
    app.post('/pets', { onRequest: [verifyJWT] }, create);
}
