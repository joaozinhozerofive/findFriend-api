import { PetRepository } from "@/repositories/prisma/pets/prisma-pets-repository";
import { PetFindUniqueUseCase } from "@/use-cases/pets/pet-find-unique-use-case";

export function makePetFindUniqueUseCase() {
    const petRepository = new PetRepository();
    
    return new PetFindUniqueUseCase(petRepository);
}