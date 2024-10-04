import { OrgsRepository } from "@/repositories/prisma/orgs/prisma-orgs-repository";
import { OrgSessionUseCase } from "@/use-cases/orgs/org-session-use-case";

export function makeOrgSessionUseCase() {
    const orgRepository = new OrgsRepository();
    
    return new OrgSessionUseCase(orgRepository);
}