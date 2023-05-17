interface AppErrorArgs {
    name?: string;
    httpCode: number;
    description: string;
    isOperational?: boolean;
}

export class CustomError extends Error {
    public readonly name: string;
    public readonly httpCode: number;
    public readonly isOperational: boolean = true;
    public readonly description: string;

    constructor(args: AppErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || 'Error';
        this.httpCode = args.httpCode || 500;
        this.description = args.description || '';

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}