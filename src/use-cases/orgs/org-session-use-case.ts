import { OrgsRepository } from "@/repositories/types/orgs-repository"
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { comparePasswords } from "./utils/compare-passwords";
import { Org } from "@prisma/client";

interface OrgSessionRequest {
    email        : string, 
    password     : string,  
}


interface OrgSessionResponse{
    org : Org
}

export class OrgSessionUseCase {
    constructor(private orgsRepository : OrgsRepository) {}

    async execute({
        email,
        password, 
    } : OrgSessionRequest) : Promise<OrgSessionResponse> {
        const orgByEmail = await this.orgsRepository.findByEmail(email)
        
        if(!orgByEmail) throw new InvalidCredentialsError()

        const passwordHashed  = orgByEmail.password 

        const passwordMatched = await comparePasswords(passwordHashed, password);

        if(!passwordMatched) throw new InvalidCredentialsError()

        return {
            org : orgByEmail
        }
    }   
}