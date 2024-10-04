import { makeOrgSessionUseCase } from "@/use-cases/factories/orgs/make-org-session-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { newRefreshToken } from "./utils/new-refresh-token";
import { newToken } from "./utils/new-token";

export async function orgSessionController(request : FastifyRequest, reply : FastifyReply) {
    const sessionBodySchema = z.object({
        email        : z.string().max(200).email(), 
        password     : z.string(),
    })

    const body       = sessionBodySchema.parse(request.body);
    const orgUseCase = makeOrgSessionUseCase();
    const { org }    = await orgUseCase.execute(body);

    const token = await newToken({reply, is_donor : org.is_donor, sub : org.id})

    const refreshToken = await newRefreshToken({reply, is_donor : org.is_donor, sub : org.id})

    return reply
        .setCookie('refreshToken', refreshToken, {
            path : "/", 
            secure : true, 
            sameSite : true, 
            httpOnly : true
        })
        .status(201)
        .send({token})
}
