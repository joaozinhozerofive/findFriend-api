import { makePetFindAllUseCase } from "@/use-cases/factories/pets/make-pet-find-all-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petFindAll(request : FastifyRequest, reply : FastifyReply) {
    const findByQuery = z.object({
        name        : z.string().optional(),
        particulars : z.string().optional(), 
        breed       : z.string().optional(), 
        city        : z.string().optional(),
    })

    const query = findByQuery.parse(request.query);
    query.city  = query.city?.replaceAll("-", " ");
    
    const petFindAllUseCase = makePetFindAllUseCase();
    const { pets } = await petFindAllUseCase.execute({...query, particulars : query.particulars?.split(",")});

    reply.send({
        pets
    })
}