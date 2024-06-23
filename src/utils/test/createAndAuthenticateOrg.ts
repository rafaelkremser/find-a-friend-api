import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOrg(app: FastifyInstance) {
    const org = await prisma.organization.create({
        data: {
            ownerName: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6),
            phone: '11999999999',
            city: 'Belo Horizonte',
        },
    });

    const authResponse = await request(app.server).post('/sessions').send({
        email: 'johndoe@email.com',
        password: '123456',
    });

    const { token } = authResponse.body;

    return { org, token };
}
