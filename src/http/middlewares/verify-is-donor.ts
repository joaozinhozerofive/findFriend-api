import { AppError } from "@/errors/error-default-app-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyIsDonor(request: FastifyRequest, reply: FastifyReply) {
    if(!request.user.is_donor) {
        throw new AppError("Unauthorized.", 401)
    }
}