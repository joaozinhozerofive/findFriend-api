import { AppError } from "@/errors/error-default-app-error";

export class OrgIsRequiredError extends AppError{
    constructor() {
        super('Org is required.', 401);
    }
}