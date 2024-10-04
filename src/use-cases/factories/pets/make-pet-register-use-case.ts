import { PetRepository } from "@/repositories/prisma/pets/prisma-pets-repository";
import { PetRegisterUseCase } from "@/use-cases/pets/pet-register-use-case";

export function makePetRegisterUseCase() {
    const petRepository = new PetRepository();
    
    return new PetRegisterUseCase(petRepository);
}