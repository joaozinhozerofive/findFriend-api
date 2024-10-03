import { Org } from "@prisma/client"
import { EmailAlreadyExitsError } from "./errors/email-already-exists"
import { OrgsRepository } from "@/repositories/types/orgs-repository"
import { hash } from "bcryptjs"

interface OrgRegisterRequest {
    name         : string,  
    email        : string, 
    password     : string,  
    whatsapp     : string,  
    cep          : string | null,  
    street       : string | null,  
    state        : string | null, 
    neighborhood : string | null, 
    city         : string, 
    latitude     : number | null, 
    longitude    : number | null
}

interface OrgRegisterResponse{
    org : Org
}

export class OrgRegisterUseCase {
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
        longitude
    } : OrgRegisterRequest) : Promise<OrgRegisterResponse> {

        const orgByEmail = await this.orgsRepository.findByEmail(email);
    
        if(orgByEmail) throw new EmailAlreadyExitsError()

        const passwordHash = await hash(password, 10);    
        const orgCreated = await this.orgsRepository.create({
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
            longitude
        })
    
        return {
            org : orgCreated
        }    
    }
}