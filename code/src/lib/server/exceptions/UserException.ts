export class UserException extends Error {
    status: number;
    constructor(message, status = 400) {
        super(message);
        this.status = status;

        //you have to set the prototype explicitly in typescript(dumb/lame)
        Object.setPrototypeOf(this, UserException.prototype);
    }
}