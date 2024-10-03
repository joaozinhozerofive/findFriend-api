import { AppError } from "@/errors/error-default-app-error";

export class InvalidCredentialsError extends AppError{
    constructor() {
        super('Invalid credentials.', 401);
    }
}