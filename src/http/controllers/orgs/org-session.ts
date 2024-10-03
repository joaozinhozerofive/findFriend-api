import { makeOrgSessionUseCase } from "@/use-cases/factories/orgs/make-org-session-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function orgSessionController(request : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        email        : z.string().max(200).email(), 
        password     : z.string(),
    })

    const body       = registerBodySchema.parse(request.body);
    const orgUseCase = makeOrgSessionUseCase();
    const { org }    = await orgUseCase.execute(body);

    const token = await reply.jwtSign(
        {
            is_donor : org.is_donor
        }, 
        {
            sign : {
                sub : org.id 
            }
        }
    )

    const refreshToken = await reply.jwtSign(
        {
            is_donor : org.is_donor
        }, 
        {
            sign : {
                sub : org.id, 
                expiresIn : "7d" 
            }
        }
    )

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
