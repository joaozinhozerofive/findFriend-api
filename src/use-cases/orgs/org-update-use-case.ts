import { Org } from "@prisma/client"
import { EmailAlreadyExitsError } from "./errors/email-already-exists"
import { OrgsRepository } from "@/repositories/types/orgs-repository"
import { hash } from "bcryptjs"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import { OrgNotFoundError } from "./errors/org-not-found"

interface OrgUpdateRequest {
    name?         : string,  
    email?        : string, 
    password?     : string,  
    whatsapp?     : string,  
    cep?          : string,  
    street?       : string,  
    state?        : string, 
    neighborhood? : string, 
    city?         : string, 
    latitude?     : number, 
    longitude?    : number, 
    is_donor?      : boolean
    org_id        : string, 
}

interface OrgUpdateResponse{
    org : Org | null
}

export class OrgUpdateUseCase {
    constructor(private orgsRepository : OrgsRepository) {}

    async execute({
        name, 
        email,
        password, 
        whatsapp, 
        cep, 
        street, 
        state,
        neighborhood,
        city,
        latitude,
        longitude, 
        org_id, 
        is_donor
    } : OrgUpdateRequest) : Promise<OrgUpdateResponse | undefined> {
        const orgById = await this.orgsRepository.findById(org_id)

        if(!orgById) throw new OrgNotFoundError(); 

        const passwordHash = password ? await hash(password, 8) : undefined;

        try {
            const orgUpdated = await this.orgsRepository.update({
                data : {
                    name, 
                    email,
                    password : passwordHash, 
                    whatsapp, 
                    cep, 
                    street, 
                    state,
                    neighborhood,
                    city,
                    latitude,
                    longitude, 
                    is_donor
                },
                where : {
                    id : org_id
                }
            })
    
            return {
                org : orgUpdated
            }

        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') throw new EmailAlreadyExitsError() 
            }
        }
    } 
}