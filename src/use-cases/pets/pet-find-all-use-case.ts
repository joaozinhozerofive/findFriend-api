import { PetRepository } from "@/repositories/types/pets-repository";
import { Pet } from "@prisma/client";

interface PetFindAllRequest {
    name?        : string,
    particulars? : string[], 
    breed?       : string, 
    city?        : string, 
}

interface PetFindAllResponse {
    pets : Pet[] | null
}

export class PetFindAllUseCase{
    constructor(private petRepository : PetRepository) { }

    async execute({
        name, 
        particulars, 
        breed, 
        city
    } : PetFindAllRequest) : Promise<PetFindAllResponse> {
        const pets = await this.petRepository.findAll({name, particulars, breed, city});

        return {
            pets
        }
    }       
}   