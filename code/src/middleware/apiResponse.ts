import { UserException } from "$lib/server/exceptions/UserException";
import { json } from "@sveltejs/kit";

export function processAPIRequest(handler: Function) {
    return async (...args: any[]) => {
        try {
            return await handler(...args);
        } catch (error) {
            console.log(error);
            let status = 500;
            let message = "An unknown error occurred";
            if (error instanceof UserException) {
                status = error.status;
                message = error.message;
            }
            return json({ error: message, status: status });
        }
    };
}