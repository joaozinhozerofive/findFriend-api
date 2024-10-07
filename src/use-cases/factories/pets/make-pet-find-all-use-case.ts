import { PetRepository } from "@/repositories/prisma/pets/prisma-pets-repository";
import { PetFindAllUseCase } from "@/use-cases/pets/pet-find-all-use-case";

export function makePetFindAllUseCase() {
    const petRepository = new PetRepository();
    
    return new PetFindAllUseCase(petRepository);
}