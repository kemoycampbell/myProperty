import { describe, it, expect, vi } from "vitest";
import { processAPIRequest } from "src/middleware/apiResponse";
import { UserException } from "$lib/server/exceptions/UserException";
import { json } from "@sveltejs/kit";

describe("processAPIRequest", () => {

    //should return a json if all is well with the request
    it("should return the result of a successful handler", async () => {    
        const mockHandler = vi.fn().mockResolvedValue(json({ success: true }));
        const wrapped = processAPIRequest(mockHandler);

        const response = await wrapped();
        const body = await response.body?.getReader().read();

        expect(mockHandler).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(body?.value).toBeDefined(); // checks response content exists
    });

    //should show UserException error to the user

    it("should catch a UserException and return correct json", async () => {
        const mockHandler = vi.fn().mockRejectedValue(new UserException("Not allowed", 403));
        const wrapped = processAPIRequest(mockHandler);

        const response = await wrapped();
        const jsonText = await response.text();
        const result = JSON.parse(jsonText);

        expect(result).toEqual({ error: "Not allowed", status: 403 });
    });

    //should show generic error to the user
    it("should catch a generic error and return correct json", async () => {
        const mockHandler = vi.fn().mockRejectedValue(new Error("Internal Error"));
        const wrapped = processAPIRequest(mockHandler);

        const response = await wrapped();
        const jsonText = await response.text();
        const result = JSON.parse(jsonText);

        expect(result).toEqual({ error: "An unknown error occurred", status: 500 });
    });

});
