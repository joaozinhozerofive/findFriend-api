import { makePetRegisterUseCase } from "@/use-cases/factories/pets/make-pet-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petRegister(request : FastifyRequest, reply : FastifyReply) {
    const findByParamsBodySchema = z.object({
        name        : z.string().min(2).max(100).nullable(), 
        animal      : z.string().max(50), 
        breed       : z.string().max(50).nullable(), 
        about       : z.string().max(500).nullable(),     
        age         : z.string().max(25).nullable(),   
        weight      : z.number(),  
        is_available: z.boolean().default(true),
        particulars : z.array(z.string()), 
    })

    const body =  registerBodySchema.parse(request.body);

    const petUseCase =  makePetRegisterUseCase();

    const { pet } = await petUseCase.execute({ ...body, org_id : request.user.sub });

    try{
        reply 
        .status(201) 
        .send({
            pet
        })

    } catch(error) {
        throw error;
    }

}