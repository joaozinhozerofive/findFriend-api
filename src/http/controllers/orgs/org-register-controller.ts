import { makeOrgRegisterUseCase } from "@/use-cases/factories/orgs/make-org-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function orgRegisterController(request : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        name         : z.string().min(2).max(100), 
        email        : z.string().max(200).email(), 
        password     : z.string().min(6),     
        whatsapp     : z.string().min(5).max(20),     
        cep          : z.string().min(8).max(8).nullable(), 
        street       : z.string().min(2).max(100).nullable(),
        state        : z.string().min(2).max(100).nullable(),
        neighborhood : z.string().min(2).max(100).nullable(),
        city         : z.string().min(2).max(100),
        is_donor     : z.boolean().nullable(), 
        latitude     : z.number().nullable().refine(val => Math.abs(val as number) < 180), 
        longitude    : z.number().nullable().refine(val => Math.abs(val as number) < 180), 
    })
    const body        =  registerBodySchema.parse(request.body);
    const orgRegister = makeOrgRegisterUseCase();
    const org         = await orgRegister.execute(body);

    return reply
        .status(201)    
        .send({
        org
    })
}
