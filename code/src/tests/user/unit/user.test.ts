import { UserException } from "$lib/server/exceptions/UserException";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { UserService } from "$lib/server/services/userService";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import bcrypt from "bcryptjs";
import jwt from "$lib/server/jwt/jwt";


let userService: UserService;
let userRepository: Partial<UserRepository>;
let roleRepository: Partial<RoleRepository>;

describe("UserService Tests", () => {

    //a fake role with the type property owner
    const fakeRole = new Role();
    fakeRole.name = RoleType.OWNER;

    const fakeUserDBUser: IUser = {
        id: "123456",
        firstName: "test",
        lastName: "test",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
        role: fakeRole,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    beforeEach(()=>{
        //we want to mock the findByUsername, save, findOne methods of the user repository
        userRepository = {
            findByUsername: vi.fn().mockResolvedValue(fakeUserDBUser),
            save: vi.fn().mockResolvedValue(fakeUserDBUser),
            findOne: vi.fn().mockResolvedValue(fakeUserDBUser),
        } as Partial<UserRepository>;

        //we want to mock the findByName method of the role repository
        roleRepository = {
            findByName: vi.fn().mockResolvedValue(fakeRole),
        } as Partial<RoleRepository>;



        
        //pass the mocked repository to the userService
        userService = new UserService(userRepository as UserRepository, roleRepository as RoleRepository);

    })

    it('should throw an error if username is not provided', async () => {

        //fake testing data
        const username = "";
        const password = "password123";

        //call the promise function
        const authenticate = userService.authenticate(username, password);

        //expect the promise to throw an error
       await(expect(authenticate)).rejects.toThrowError(UserException);
       await expect(authenticate).rejects.toThrowError("Username and password are required");
    });

    it('should throw an error if password is not provided', async () => {

        //fake testing data
        const username = "testuser";
        const password = "";

        //call the promise function
        const authenticate = userService.authenticate(username, password);

        //expect the promise to throw an error
       await(expect(authenticate)).rejects.toThrowError(UserException);
       await expect(authenticate).rejects.toThrowError("Username and password are required");
    });

    it('should throw an error if user is not found', async () => {

        //fake testing data
        const username = "testuser";
        const password = "password123";

        // //mock the findByUsername method to return null to indicate no user
        (userRepository.findByUsername as Mock).mockResolvedValue(null);

        //call the promise function
        const authenticate = userService.authenticate(username, password);

        //expect the promise to throw an error
       await(expect(authenticate)).rejects.toThrowError(UserException);
       await expect(authenticate).rejects.toThrowError("Invalid credential");
    });

    it('should throw an error if password is incorrect', async () => {

        //fake testing data
        const username = "testuser";
        const password = "wrongpassword";

        //mock the findByUsername method to return a user object
        (userRepository.findByUsername as Mock).mockResolvedValue(fakeUserDBUser);

        //call the promise function
        const authenticate = userService.authenticate(username, password);

        //expect the promise to throw an error
       await(expect(authenticate)).rejects.toThrowError(UserException);
       await expect(authenticate).rejects.toThrowError("Invalid credential");
    });

    it('should return a jwt token if the credentials are validated', async () => {

        //fake testing data
        const username = fakeUserDBUser.username;
        const password = fakeUserDBUser.password;

        //spy on the bcrypt.compare method to return true to indicate password match
        vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);


        //mock the jwt.generate method to return a fake token
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImFkbWluQG15cHJvcGVydHkuY29tIiwiaWF0IjoxNzQzMTA4MTgxLCJleHAiOjE3NDU3MDAxODF9.9tgSRVoGEmQF_XnJjpczM9H1d7CaUw2SXy7V2x6wvCU";;
        vi.spyOn(jwt, 'generate').mockReturnValue(fakeToken)
        



        //call the promise function
        const authenticate = await userService.authenticate(username, password);

        // assert
        expect(authenticate).toBeDefined();
        //make sure it match the token(fake token)
        expect(authenticate).toBe(fakeToken);
        //make sure the token is a string
        expect(authenticate).toBeTypeOf("string");
        //contain jwt header
        expect(authenticate).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
    });

    it('should throw an error if first name is not provided in register', async () => {

        //fake data
        const first = "";
        const last = "test";
        const email = "foo@gmail.com";
        const username = "foo";
        const password = "password";
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("First and last name are required");
    });

    it('should throw an error if last name is not provided in register', async () => {
        //fake data
        const first = "test";
        const last = "";
        const email = "foo@gmail.com";
        const username = "foo";
        const password = "password";
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("First and last name are required");
    });

    it('should throw an error if email is not provided in register', async () => {
        //fake data
        const first = "test";
        const last = "test";
        const email = "";
        const username = "foo";
        const password = "password";
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("Email is required");
    });

    it('should throw an error if username is not provided in register', async () => {
        //fake data
        const first = "test";
        const last = "test";
        const email = "foo@gmail.com";
        const username = "";
        const password = "password";
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("Username and password are required");

    });

    it('should throw an error if password is not provided in register', async () => {
        //fake data
        const first = "test";
        const last = "test";
        const email = "foo@gmail.com";
        const username = "foo";
        const password = "";
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("Username and password are required");
    });

    it('should throw an error if role is not provided in register', async () => {
        //fake data
        const first = "test";
        const last = "test";
        const email = "foo@gmail.com";
        const username = "foo";
        const password = "password";
        const role = null;
        
        //call the promise function
        const res = userService.register(first, last, email, username, password, role);

        //expect the promise to throw an error
        await expect(res).rejects.toThrowError(UserException);
        await expect(res).rejects.toThrowError("Role is required");
    });

    it('should successfully register a user', async () => {
        //fake data
        const first = fakeUserDBUser.firstName;
        const last = fakeUserDBUser.lastName;
        const email = fakeUserDBUser.email;
        const username = fakeUserDBUser.username;
        const password = fakeUserDBUser.password;
        const role = RoleType.OWNER;
        
        //call the promise function
        const res = await userService.register(first, last, email, username, password, role);
        
        //assert
        expect(res).toBeDefined();
        expect(res).toBeTypeOf("string"); //a string because a suggessful registeration will return a token
        expect(res).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"); //a jwt token will be returned
    });


});