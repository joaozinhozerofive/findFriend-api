import fastify from "fastify";
import { AppError } from "./errors/error-default-app-error";
import { env } from "./env";
import { petRoutes } from "./http/routes/pets/pet-routes";
import { orgRoutes } from "./http/routes/orgs/org-routes";
import fastifyJwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";

export const app = fastify();
app.register(fastifyJwt, {
    secret : env.AUTH_SCRET, 
    cookie : {
        cookieName : 'refreshToken', 
        signed     : false
    },
    sign   : {
        expiresIn : "1d"
    }
})

app.register(fastifyCookie)

app.register(orgRoutes);
app.register(petRoutes);

app.setErrorHandler((err, _, reply) => {
    if(err instanceof AppError) {
        return reply
         .status(err.statusCode)
         .send({
            status  : err.statusCode,
            message : err.message 
         })
    }

    if(env.NODE_ENV != 'production') {
        throw err;
    } 

    return reply
        .status(500)    
        .send({message : "Internal server error."})
})
