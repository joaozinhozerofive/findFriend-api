import { Org } from "@prisma/client"
import { EmailAlreadyExitsError } from "./errors/email-already-exists"
import { OrgsRepository } from "@/repositories/types/orgs-repository"
import { hash } from "bcryptjs"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import { OrgNotFoundError } from "./errors/org-not-found"
import { comparePasswords } from "./utils/compare-passwords"
import { InvalidPasswordError } from "./errors/invalid-password"

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
    is_donor?     : boolean
    org_id        : string, 
    old_password? : string
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
        is_donor,
        old_password
    } : OrgUpdateRequest) : Promise<OrgUpdateResponse> {
        const orgById = await this.orgsRepository.findById(org_id)

        if(!orgById) throw new OrgNotFoundError(); 

        if(password && !old_password) {
            throw new InvalidPasswordError();
        }

        if(password && !await comparePasswords(orgById.password, old_password as string)) {
            throw new InvalidPasswordError();
        }

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

            throw error 
        }
    } 
}