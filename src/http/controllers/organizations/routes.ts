import { FastifyInstance } from 'fastify';
import { registerOrganization } from './register';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { refresh } from './refresh';

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganization);
    // app.post('/sessions', authenticate);

    app.patch('/token/refresh', refresh);

    // authenticated
    // app.get('/me', { onRequest: [verifyJWT] }, profile);
}
