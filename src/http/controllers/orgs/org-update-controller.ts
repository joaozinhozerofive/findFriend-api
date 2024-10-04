import { makeOrgUpdateUseCase } from "@/use-cases/factories/orgs/make-org-update-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { newRefreshToken } from "./utils/new-refresh-token";

export async function orgUpdateController(request : FastifyRequest, reply : FastifyReply) {
    const updateBodySchema = z.object({
        name         : z.string().min(2).max(100).optional(), 
        email        : z.string().max(200).email().optional(), 
        old_password : z.string().min(6).optional(),     
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

    const body              = updateBodySchema.parse(request.body);
    const orgUpdateUseCase  = makeOrgUpdateUseCase();
    const { org }           = await orgUpdateUseCase.execute({...body, org_id : request.user.sub});

    if(!org) {
        return reply
        .status(200)
        .send({
            org
        })
    }

    const refreshToken = await newRefreshToken({reply, is_donor: org.is_donor, sub: org.id})

    return reply
        .setCookie('refreshToken', refreshToken, {
            path : "/", 
            secure : true, 
            sameSite : true, 
            httpOnly : true
        })
        .status(200)
        .send({
            org
        })
}
