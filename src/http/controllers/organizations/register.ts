import { OrgAlreadyExistsError } from '@/use-cases/errors/orgAlreadyExists';
import { makeRegisterUseCase } from '@/use-cases/factories/makeRegister';
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
        city: z.string(),
    });

    const body = requestBodyResponse.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.handle(body);
    } catch (err) {
        if (err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err;
    }

    return reply.status(201).send();
}
