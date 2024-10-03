import { AppError } from "@/errors/error-default-app-error";
import { prisma } from "@/lib/prisma";
import { makeOrgUpdateUseCase } from "@/use-cases/factories/orgs/make-org-update-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function orgUpdateController(request : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        name         : z.string().min(2).max(100).optional(), 
        email        : z.string().max(200).email().optional(), 
        password     : z.string().min(6).optional(),     
        whatsapp     : z.string().min(5).max(20).optional(),     
        cep          : z.string().min(8).max(8).optional(), 
        street       : z.string().min(2).max(100).optional(),
        state        : z.string().min(2).max(100).optional(),
        neighborhood : z.string().min(2).max(100).optional(),
        city         : z.string().min(2).max(100).optional(),
        is_donor     : z.boolean().default(false).optional(), 
        latitude     : z.number().refine(val => Math.abs(val as number) < 90).optional(), 
        longitude    : z.number().refine(val => Math.abs(val as number) < 90).optional(), 
    })

    const body       = registerBodySchema.parse(request.body);
    const orgUseCase = makeOrgUpdateUseCase();
    const org        = await orgUseCase.execute({...body, org_id : '2a72e3a8-c1eb-4eab-8383-fbae593fa99d'});

    return reply
        .status(204)
        .send({
        org
    })
}
