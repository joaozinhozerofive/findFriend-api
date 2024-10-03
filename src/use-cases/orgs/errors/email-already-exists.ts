import { AppError } from "@/errors/error-default-app-error";

export class EmailAlreadyExitsError extends AppError{
    constructor() {
        super('E-mail already exists.', 409);
    }
}