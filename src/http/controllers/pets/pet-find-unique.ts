import { makePetFindAllUseCase } from "@/use-cases/factories/pets/make-pet-find-all-use-case";
import { makePetFindUniqueUseCase } from "@/use-cases/factories/pets/make-pet-find-unique-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petFindUnique(request : FastifyRequest, reply : FastifyReply) {
    const findUniqueParam = z.object({
        id : z.string(),
    })

    const petUseCaseFindUnique = makePetFindUniqueUseCase()
    const params = findUniqueParam.parse(request.params)
    const { pet } = await petUseCaseFindUnique.execute(params);

    return reply
        .send({
            pet
        })
}