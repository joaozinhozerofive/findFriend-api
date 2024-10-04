import { FastifyReply } from "fastify"

interface NewTokenProps{ 
    reply    : FastifyReply, 
    is_donor : boolean | null,
    sub      : string 
}

export async function newToken({reply, is_donor, sub} : NewTokenProps) {
    return await reply.jwtSign(
        {
            is_donor
        }, 
        {
            sign : {
                sub
            }
        }
    )
}