import { InvalidCredentialsError } from "@/use-cases/orgs/errors/invalid-credentials";
import { FastifyReply, FastifyRequest } from "fastify";

export async function orgRefreshTokenController(request : FastifyRequest, reply : FastifyReply) {
    try {
        await request.jwtVerify({onlyCookie : true});

        const token = await reply.jwtSign(
            {
                is_donor : request.user.is_donor
            }, 
            {
                sign : {
                    sub : request.user.sub
                }
            }
        )
    
        const refreshToken = await reply.jwtSign(
            {
                is_donor : request.user.is_donor
            }, 
            {
                sign : {
                    sub : request.user.sub, 
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
        .status(204)
        .send({token})

    } catch(error) {
        throw new InvalidCredentialsError();
    }
}
