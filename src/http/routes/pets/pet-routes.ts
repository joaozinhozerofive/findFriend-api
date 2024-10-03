import { FastifyInstance } from "fastify";
import { petRegister } from "@/http/controllers/pets/pet-register";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function petRoutes(app : FastifyInstance) {
    app.addHook('onRequest', verifyJwt)
    app.post('/pet/register', petRegister)
}