import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petRegister(request : FastifyRequest, reply : FastifyReply) {
    const registerBodySchema = z.object({
        name        : z.string().min(2).max(100).nullable(), 
        animal      : z.string().max(50), 
        breed       : z.string().max(50).nullable(), 
        about       : z.string().max(500).nullable(),     
        age         : z.string().max(25).nullable(),   
        weight      : z.number(),  
        is_available: z.boolean().default(true),
        particulars : z.array(z.string()), 
        org_id      : z.string(), 
    })

    const {name, animal, breed, about, age, weight, is_available, particulars, org_id,} =  registerBodySchema.parse(request.body);
    
    const petCreated = await prisma.pet.create({
        data : {
            name,        
            animal,      
            breed,       
            about,       
            age,         
            weight,      
            is_available,
            org_id,      
            Particular : {
                createMany :{
                    data : [
                        ...particulars.map(description => { return {description} })
                    ] 
                } 
            }
        }
    })

    try{
        reply 
        .status(201) 
        .send({
            pet : petCreated
        })

    } catch(error) {
        throw error;
    }

}