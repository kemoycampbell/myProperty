import type { RoleType } from "$lib/server/models/entity/role/Role";
import { describe, it, expect, beforeAll, afterAll, afterEach, beforeEach } from "vitest";
import dotenv from "dotenv";
import jwt from "$lib/server/jwt/jwt";

//a helper function that can takes a endpoint, payload, method and return the response
//will move this to a more central location in the future
const request = async (endpoint: string, payload?: any, method: string = 'GET') => {
    let options: any = {
        method: method,
        headers: {
            'Content-Type': 'application/json', // Always send JSON content type by default
        }
    };

    if (payload) {
        options.body = JSON.stringify(payload);
    }

    return await fetch(endpoint, options);
}




//This is the test suite for the auth api
describe('Testing the /api/auth/login endpoing', () => {

    //We need to setup the api endpoint
    let endpoint = "http://localhost:5173/api/auth";

    let user = "propertyUser";
    let password = "propertyPassword";
    let role: RoleType = "owner" as RoleType;
    let token:string;

    //before we can test a login, we need to add the user
    beforeEach(async () => {

        let uri = `${endpoint}/register`;
        let payload = {username: user, password: password, role: role };
        const method = "POST";
        await request(uri, payload, method);
    });

    //it should successfully authenticate the user and return a token
    it('should return return a json object when the user authenticate', async () => {

        //setup the login endpoint and payload
        let uri = `${endpoint}/login`;
        let payload = { username: user, password: password };
        let method = "POST";

        //call the endpoint
        let response = await request(uri, payload, method);

        //extract the token
        token = (await response.json()).token;

        const contentType = response.headers.get('content-type');
        expect(contentType).toBe('application/json');
        expect(response.status).toBe(200);

    });

    it('should return a 200 status code  and authorize token when the user is authenticated', async () => {
        //setup the login endpoint and payload
        let uri = `${endpoint}/login`;
        let payload = { username: user, password: password };
        let method = "POST";

        //call the endpoint
        let response = await request(uri, payload, method);

        //extract the token
        token = (await response.json()).token;

        const contentType = response.headers.get('content-type');
        expect(contentType).toBe('application/json');
        expect(response.status).toBe(200);
        expect(token).toBeDefined();

        //make sure the token have the user id and username
        let decoded = jwt.decodeToken(token);
        expect(decoded.username).toBe(user);
        expect(decoded.id).toBeDefined();
    });

    it('should return a 401 and error message when the user try to authenticate with invalid credential', async () => {
        //setup the login endpoint and payload
        let uri = `${endpoint}/login`;
        let payload = { username: user, password: "invalid" };
        let method = "POST";

        //call the endpoint
        let response = await request(uri, payload, method);

        const contentType = response.headers.get('content-type');
        expect(contentType).toBe('application/json');
        

        let data = await response.json();
        expect(data.status).toBe(401);
        expect(data.error).toBe("Invalid credential");
    });

    it('should return a 401 and error message when the user try to login without a username or password', async () => {
        //setup the login endpoint and payload
        let uri = `${endpoint}/login`;
        let payload = { username: user, password:"" };
        let method = "POST";

        //call the endpoint
        let response = await request(uri, payload, method);

        const contentType = response.headers.get('content-type');
        expect(contentType).toBe('application/json');
        

        let data = await response.json();
        expect(data.status).toBe(401);
        expect(data.error).toBe("Username and password are required");
    });

    //clean up the test user
    afterEach(async () => {
        //delete the user
        if(token){
            console.log('The token is ', token);
            let id = jwt.decodeToken(token).id;
            await fetch(`http://localhost:5173/api/user/${id}`, {
                method: 'DELETE'
            });
        }

    });


;});