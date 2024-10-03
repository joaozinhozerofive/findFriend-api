import { AppError } from "@/errors/error-default-app-error";

export class OrgNotFoundError extends AppError{
    constructor() {
        super('Org not found', 404);
    }
}