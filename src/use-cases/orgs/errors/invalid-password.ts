import { AppError } from "@/errors/error-default-app-error";

export class InvalidPasswordError extends AppError{
    constructor() {
        super('Invalid password.', 401);
    }
}