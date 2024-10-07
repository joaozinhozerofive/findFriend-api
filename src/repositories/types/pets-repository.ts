import { Org, Pet, Prisma } from "@prisma/client";

interface FindAllProps {
    name? : string
    particulars?: string[],
    breed?: string,
    city?: string
    about?: string
}

export interface PetRepository {
    create(data : Prisma.PetCreateArgs) : Promise<Pet>
    findOrgById(id : string) : Promise<Org | null>
    findAll(params : FindAllProps) : Promise<Pet[] | null>
    findUnique(id : string) : Promise<Pet | null>
}