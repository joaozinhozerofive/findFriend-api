import { Org, Pet, Prisma } from "@prisma/client";

interface FindAllProps {
    particulars?: string[],
    age?: string,
    breed?: string,
    city?: string
    about?: string
}

export interface PetRepository {
    create(data : Prisma.PetCreateArgs) : Promise<Pet>
    findOrgById(id : string) : Promise<Org | null>
    findAll(params : FindAllProps) : Promise<Pet[] | null>
}