import type { IUserException } from "./IUserException";

export class UserException extends Error implements IUserException
{
    status: number;

    constructor(message: string, status: number = 400)
    {
        super(message);
        this.status = status;

        // Ensure the prototype chain is correctly set
        Object.setPrototypeOf(this, UserException.prototype);
    }
}