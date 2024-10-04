import { FastifyReply } from "fastify"

interface NewRefreshTokenProps{ 
    reply    : FastifyReply, 
    is_donor : boolean | null,
    sub      : string 
}

export async function newRefreshToken({reply, is_donor, sub} : NewRefreshTokenProps) {
    return await reply.jwtSign(
        {
            is_donor 
        }, 
        {
            sign : {
                sub,
                expiresIn : "7d" 
            }
        }
    )
}