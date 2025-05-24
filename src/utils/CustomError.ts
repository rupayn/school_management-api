interface ErrorDetail {
    message: string;
    code?: string;
}


export class CustomError extends Error {
    public statusCode: number;
    public success: boolean;
    public error: ErrorDetail[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        error: ErrorDetail[] = [],
        stack?: string,
    ) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.success = false;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
