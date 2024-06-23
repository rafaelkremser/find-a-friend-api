import { FastifyInstance } from 'fastify';
import { create } from './create';

export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/pets', create);
}
