import { FastifyInstance } from 'fastify';
import { registerOrganization } from './register';
import { refresh } from './refresh';
import { authenticate } from './authenticate';

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganization);
    app.post('/sessions', authenticate);

    app.patch('/token/refresh', refresh);
}
