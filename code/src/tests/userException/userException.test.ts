import { UserException } from "$lib/server/exceptions/UserException";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

describe("UserException Tests", () => {

    it("should create a UserException with the correct properties", () => {
        const message = "Not allowed";
        const status = 403;
        const exception = new UserException(message, status);

        expect(exception.message).toBe(message);
        expect(exception.status).toBe(status);
    });

    it("should create a UserException with default status 400", () => {
        const message = "An unknown error occurred";
        const exception = new UserException(message);

        expect(exception.message).toBe(message);
        expect(exception.status).toBe(400);
    });
});