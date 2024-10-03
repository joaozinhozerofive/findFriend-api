export class AppError {
    constructor(
        public message : string,
        public statusCode : number = 500
    ) {
        this.message = message;
        this.statusCode = statusCode;
    }
}