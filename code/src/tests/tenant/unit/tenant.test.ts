import { UserException } from "$lib/server/exceptions/UserException";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import type { TenantRepository } from "$lib/server/repositories/tenant/tenantRepository";
import type { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { TenantService } from "$lib/server/services/tenantService";
import { UserService } from "$lib/server/services/userService";
import { describe,beforeEach, vi, it, expect } from "vitest";


describe("TenantService Tests", () => {

    let tenantService: TenantService;
    let tenantRepository: Partial<TenantRepository>;
    let userService: UserService
    let unitRepository: Partial<UnitRepository>;

    const tenantRole = new Role();
        tenantRole.name = RoleType.TENANT;

    const fakeUser: IUser = {
        id: "123456",
        firstName: "test",
        lastName: "test",
        email: "foo@gmail.com",
        username: "foo",
        password: "password",
        role: tenantRole,
        createdAt: new Date(),
        updatedAt: new Date()
    };


    beforeEach((()=>{
        
        //mock the userRepository save
        const mockUserSave = {
            save: vi.fn().mockResolvedValue(fakeUser)
        } as Partial<UserRepository>;

        const mockFindRole = {
            findByName: vi.fn().mockResolvedValue(tenantRole)
        } as Partial<RoleRepository>;

        //pass the mocked repository to the userService, we dont care about roleRepository for this test
        //we want to mock the save method of the user repository
        userService = new UserService(mockUserSave as UserRepository, {} as RoleRepository);


        //we want to mock the findOne and save methods of the tenant repository
        tenantRepository = {
            findOne: vi.fn(),
            save: vi.fn()
        } as Partial<TenantRepository>;

        //we want to mock the findOne method of the unit repository
        unitRepository = {
            findOne: vi.fn()
        } as Partial<UnitRepository>;

        //pass the mocked repositories to the tenant service
        tenantService = new TenantService(tenantRepository as TenantRepository, userService as UserService, unitRepository as UnitRepository)

    }));

    it("should throw an error if the first name is not provided in createTenantAccount", async () => {
        // testing data
        const firstName = "";
        const lastName = "test";
        const email = "foo@gmail.com";
        const username = "foo";
        const password = "password";

    
        //pass the data to the function and store the promise without invoking it
        const createTenantAccount = tenantService.createTenantAccount(firstName, lastName, email, username, password);
    
        //Assert and invoke the promise
        await expect(createTenantAccount).rejects.toThrow(UserException);
        await expect(createTenantAccount).rejects.toThrowError("First and last name are required");
    });
    

    it('should throw an error if the last name is not provided in createTenantAccount', async () => {
                // testing data
                const firstName = "test";
                const lastName = "";
                const email = "foo@gmail.com";
                const username = "foo";
                const password = "password";
        
            
                //pass the data to the function and store the promise without invoking it
                const createTenantAccount = tenantService.createTenantAccount(firstName, lastName, email, username, password);
            
                //Assert and invoke the promise
                await expect(createTenantAccount).rejects.toThrow(UserException);
                await expect(createTenantAccount).rejects.toThrowError("First and last name are required");
    });

    it('should throw an error if the email is not provided in createTenantAccount', async () => {
        // testing data
        const firstName = "test";
        const lastName = "test";
        const email = "";
        const username = "foo";
        const password = "password";
    
        //pass the data to the function and store the promise without invoking it
        const createTenantAccount = tenantService.createTenantAccount(firstName, lastName, email, username, password);
    
        //Assert and invoke the promise
        await expect(createTenantAccount).rejects.toThrow(UserException);
        await expect(createTenantAccount).rejects.toThrowError("Email is required");
    });

    it('should throw an error if the username is not provided in createTenantAccount', async () => {
        // testing data
        const firstName = "test";
        const lastName = "test";
        const email = "foo@gmail.com";
        const username = "";
        const password = "password";
    
        //pass the data to the function and store the promise without invoking it
        const createTenantAccount = tenantService.createTenantAccount(firstName, lastName, email, username, password);
    
        //Assert and invoke the promise
        await expect(createTenantAccount).rejects.toThrow(UserException);
        await expect(createTenantAccount).rejects.toThrowError("Username and password are required");

    });

    it('should throw an error if the password is not provided in createTenantAccount', async () => {
         // testing data
         const firstName = "test";
         const lastName = "test";
         const email = "foo@gmail.com";
         const username = "foo";
         const password = "";
     
         //pass the data to the function and store the promise without invoking it
         const createTenantAccount = tenantService.createTenantAccount(firstName, lastName, email, username, password);
     
         //Assert and invoke the promise
         await expect(createTenantAccount).rejects.toThrow(UserException);
         await expect(createTenantAccount).rejects.toThrowError("Username and password are required");

    });


    // it('should successfully create a tenant account', async () => {

    //     const firstName = fakeUser.firstName
    //     const lastName = fakeUser.lastName
    //     const email = fakeUser.email
    //     const username = fakeUser.username
    //     const password = fakeUser.password
    
    //     //pass the data to the function and invoke it
    //     const result = await tenantService.createTenantAccount(firstName, lastName, email, username, password);

    //     //Assert
    //     expect(result).toBeDefined();
    //     expect(result).toBeTypeOf("string");

    // });

});