import { OrgsRepository } from "@/repositories/prisma/orgs/prisma-orgs-repository";
import { OrgRegisterUseCase } from "@/use-cases/orgs/org-register-use-case";

export function makeOrgRegisterUseCase() {
    const orgRepository = new OrgsRepository();
    
    return new OrgRegisterUseCase(orgRepository);
}