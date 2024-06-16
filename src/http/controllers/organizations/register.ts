import { OrgAlreadyExistsError } from '@/use-cases/errors/orgAlreadyExists';
import { makeRegisterUseCase } from '@/use-cases/factories/makeRegisterUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerOrganization(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const requestBodyResponse = z.object({
        ownerName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { ownerName, email, password, phone, latitude, longitude } =
        requestBodyResponse.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.handle({
            ownerName,
            email,
            password,
            phone,
            latitude,
            longitude,
        });
    } catch (err) {
        if (err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }

    return reply.status(201).send();
}
