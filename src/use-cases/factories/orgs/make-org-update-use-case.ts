import { OrgsRepository } from "@/repositories/prisma/orgs/orgs-repository";
import { OrgUpdateUseCase } from "@/use-cases/orgs/org-update-use-case";

export function makeOrgUpdateUseCase() {
    const orgRepository = new OrgsRepository();
    
    return new OrgUpdateUseCase(orgRepository);
}