import { PetRepository } from "@/repositories/types/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./erros/pet-not-found";

interface PetFindUniqueRequest {
    id : string
}

interface PetFindUniqueResponse {
    pet : Pet
}

export class PetFindUniqueUseCase{
    constructor(private petRepository : PetRepository) { }

    async execute({
        id, 
    } : PetFindUniqueRequest) : Promise<PetFindUniqueResponse> {
        const pet = await this.petRepository.findUnique(id);

        if(!pet) {
            throw new PetNotFoundError();
        }

        return {
            pet
        }
    }       
}   