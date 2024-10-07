import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";

interface FindAllProps {
    name? : string,
    particulars?: string[],
    breed?: string,
    city?: string
    about?: string
}


export class PetRepository{
    async create(data: Prisma.PetCreateArgs) {
        return await prisma.pet.create(data);
    }

    async findOrgById(id: string) {
        return await prisma.org.findUnique({ where : { id }})
    }

    async findAll(params : FindAllProps) {
        return await prisma.pet.findMany({
            where : {
                org : {
                    city : {
                        contains : params.city, 
                        mode     : "insensitive"
                    }, 
                }, 
                Particular : {
                    some : {
                        description :{
                            in : params.particulars, 
                            mode     : "insensitive"
                        }
                    }
                },
                breed : {
                    contains : params.breed, 
                    mode     : "insensitive"
                }, 
                about :{
                    contains : params.about, 
                    mode     : "insensitive"
                } 
            }
        })
    }

    async findUnique(id : string) : Promise<Pet | null> {
        return await prisma.pet.findUnique({ where : { id }});
    }
}