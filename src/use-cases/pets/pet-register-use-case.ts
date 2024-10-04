import { PetRepository } from "@/repositories/types/pets-repository";
import { Pet } from "@prisma/client";
import { OrgIsRequiredError } from "../orgs/errors/org-is-required";
import { OrgNotFoundError } from "../orgs/errors/org-not-found";

interface PetRegisterRequest {
    name          : string | null, 
    animal        : string, 
    breed         : string | null, 
    about         : string | null, 
    age           : string | null, 
    weight        : number, 
    is_available  : boolean, 
    particulars   : string[], 
    org_id        : string | null
}

interface PetRegisterResponse {
    pet : Pet
}

export class PetRegisterUseCase{
    constructor(private petRepository : PetRepository) { }

    async execute({
        name, 
        animal, 
        breed, 
        about, 
        age, 
        weight, 
        is_available,
        particulars, 
        org_id
    } : PetRegisterRequest) : Promise<PetRegisterResponse> {
        if(!org_id) throw new OrgIsRequiredError()

        const orgById = await this.petRepository.findOrgById(org_id);
        
        if(!orgById) throw new OrgNotFoundError();
 
        const petCreated = await this.petRepository.create({
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

        return {
            pet : petCreated
        }
    }
}