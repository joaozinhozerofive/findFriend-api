import { InvalidCredentialsError } from "@/use-cases/orgs/errors/invalid-credentials";
import { FastifyReply, FastifyRequest } from "fastify";
import { newRefreshToken } from "./utils/new-refresh-token";
import { newToken } from "./utils/new-token";

export async function orgRefreshTokenController(request : FastifyRequest, reply : FastifyReply) {
    try {
        await request.jwtVerify({onlyCookie : true});

        const token = await newToken({reply, is_donor : request.user.is_donor, sub : request.user.sub})
    
        const refreshToken = await newRefreshToken({reply, is_donor : request.user.is_donor, sub : request.user.sub})
    
        return reply
            .setCookie('refreshToken', refreshToken, {
                path : "/", 
                secure : true, 
                sameSite : true, 
                httpOnly : true
            })
            .status(201)
            .send({token})

    } catch(error) {
        throw new InvalidCredentialsError();
    }
}
