import { FastifyInstance } from "fastify";
import { petRegister } from "@/http/controllers/pets/pet-register";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyIsDonor } from "@/http/middlewares/verify-is-donor";
import { petFindAll } from "@/http/controllers/pets/pet-find-all";
import { petFindUnique } from "@/http/controllers/pets/pet-find-unique";

export async function petRoutes(app : FastifyInstance) {
    app.post('/pet/register', { onRequest: [verifyJwt, verifyIsDonor] }, petRegister)
    app.get('/pet/findAll', petFindAll)
    app.get('/pet/:id',     petFindUnique)
}