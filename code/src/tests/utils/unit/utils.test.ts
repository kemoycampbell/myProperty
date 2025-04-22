import { describe, it, expect, beforeEach, vi } from "vitest";
import { getUserInfo, decodeJWT } from "$lib/utils/account";

// Mock localStorage
class LocalStorageMock {
    store: Record<string, string>;
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key: string) {
        return this.store[key] || null;
    }
    setItem(key: string, value: string) {
        this.store[key] = value;
    }
    removeItem(key: string) {
        delete this.store[key];
    }
}

// Asignamos el mock a global.localStorage
const localStorageMock = new LocalStorageMock();
global.localStorage = localStorageMock as unknown as Storage;

describe("JWT Tests for lib/utils/account.ts", () => {
    beforeEach(() => {
        // Limpiamos localStorage antes de cada prueba
        localStorage.clear();
    });

    describe("decodeJWT", () => {
        it("should decode a valid JWT token", () => {
            const fakeToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImFkbWluQG15cHJvcGVydHkuY29tIiwiaWF0IjoxNzQzMTA4MTgxfQ.invalidSignature";
            const decodedPayload = decodeJWT(fakeToken);

            expect(decodedPayload).toBeDefined();
            expect(decodedPayload).toBeTypeOf("object");
            expect(decodedPayload.userId).toBe("123456");
            expect(decodedPayload.email).toBe("admin@myproperty.com");
        });

        it("should throw an error if the token is malformed", () => {
            const malformedToken = "invalid.token.without.payload";

            expect(() => decodeJWT(malformedToken)).toThrowError(
                "The string to be decoded is not correctly encoded."
            );
        });

        it("should throw an error if the payload is not valid JSON", () => {
            const invalidPayloadToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidPayload.invalidSignature";

            // Verificamos que el error incluya "is not valid JSON"
            expect(() => decodeJWT(invalidPayloadToken)).toThrowError(/is not valid JSON/);
        });
    });

    describe("getUserInfo", () => {
        it("should return user info from a valid token in localStorage", () => {
            const fakeToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImFkbWluQG15cHJvcGVydHkuY29tIiwiaWF0IjoxNzQzMTA4MTgxfQ.invalidSignature";
            localStorage.setItem("token", fakeToken);

            const userInfo = getUserInfo();

            expect(userInfo).toBeDefined();
            expect(userInfo).toBeTypeOf("object");
            expect(userInfo.userId).toBe("123456");
            expect(userInfo.email).toBe("admin@myproperty.com");
        });

        it("should throw an error if the token is not found in localStorage", () => {
            expect(() => getUserInfo()).toThrowError("Token not found");
        });

        it("should throw an error if the token in localStorage is malformed", () => {
            const malformedToken = "invalid.token.without.payload";
            localStorage.setItem("token", malformedToken);

            expect(() => getUserInfo()).toThrowError(
                "The string to be decoded is not correctly encoded."
            );
        });
    });
});