import { FastifyInstance } from "fastify";
import { petRegister } from "@/http/controllers/pets/pet-register";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyIsDonor } from "@/http/middlewares/verify-is-donor";

export async function petRoutes(app : FastifyInstance) {
    app.post('/pet/register', { onRequest: [verifyJwt, verifyIsDonor] }, petRegister)
}