import { AppError } from "@/errors/error-default-app-error";

export class PetNotFoundError extends AppError {
    constructor() {
        super('Pet not found', 404);
    }
}