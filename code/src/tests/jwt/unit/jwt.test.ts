import { describe, it, expect, beforeEach, vi, Mock, beforeAll, assert } from "vitest";
import jwt from "$lib/server/jwt/jwt";




describe("JWT Tests", () => {
    //setup the variables
    let payload:any;
    let email:string;
    let userId:string;
    let secret:string;
    let expire:string;
    let fakeToken:string;

    //this should be run before all tests
    beforeAll(()=>{
        //the secret
        secret = "topSecret";
        //set to a long expire time for ease of testing
        expire = "30d";
        //a fake jwt token
        fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImFkbWluQG15cHJvcGVydHkuY29tIiwiaWF0IjoxNzQzMTA4MTgxLCJleHAiOjE3NDU3MDAxODF9.9tgSRVoGEmQF_XnJjpczM9H1d7CaUw2SXy7V2x6wvCU";

        //a fake username and email that will be used as part of the payload to generate the token
        email = "admin@myproperty.com";
        userId = "123456";

        //the payload consists of the userId and email
        payload = {
            userId: userId,
            email:email
        }
    });

    //throw an error if secret is not provided
    it('should throw an error if secret is not provided', async () => {
        expect(()=>jwt.generate(payload)).toThrowError("SECRET missing from the env");
    });

    //successfully generate a string of token
    it('should generate a token', async () => {
        const token = jwt.generate(payload, secret, expire);
        //console.log(token);
        expect(token).toBeDefined();
        expect(token).toBeTypeOf("string");
        //assert partial of the token to ensure we are getting a token
        expect(token).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    });

   
    //successfully verify the token
    it('should successfully verify the token', async()=>{
        const res = jwt.verifyToken(fakeToken, secret);
        expect(res).toBe(true);
    });

    it('should throw a user exception if the token is invalid', async()=>{
        expect(()=>jwt.verifyToken("invalidToken", secret)).toThrowError("Invalid token");
    });

    //should successfully decoded a toekn
    it('should successfully decoded the token', async()=>{
        const res = jwt.decodeToken(fakeToken);
        expect(res).toBeDefined();
        expect(res).toBeTypeOf("object");
        expect(res.userId).toBe(userId);
        expect(res.email).toBe(email);
    });
});