import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class OrgsRepository {
    async findByEmail(email: string) {
        return await prisma.org.findUnique({ where : { email }})
    }

    async findById(id : string) {
        return await prisma.org.findUnique({ where : { id }})
    }

    async create(data : Prisma.OrgCreateInput) {
        return await prisma.org.create({ data })
    }

    async update(data : Prisma.OrgUpdateArgs) {
        return await prisma.org.update(data)
    }
}