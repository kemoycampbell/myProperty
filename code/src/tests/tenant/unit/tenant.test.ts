import { UserException } from "$lib/server/exceptions/UserException";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { ITenant } from "$lib/server/models/entity/Tenant/ITenant";
import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import type { TenantRepository } from "$lib/server/repositories/tenant/tenantRepository";
import type { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { TenantService } from "$lib/server/services/tenantService";
import { UserService } from "$lib/server/services/userService";
import { describe,beforeEach, vi, it, expect, type Mock } from "vitest";


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

    describe("Test getTenantById", () => {
        it("should throw an error if id is not provided", async () => {
            //pass the data to the function and store the promise without invoking it
            const getTenantById = tenantService.getTenantById("");
        
            //Assert and invoke the promise
            await expect(getTenantById).rejects.toThrow(UserException);
            await expect(getTenantById).rejects.toThrowError("id is required");
        });

        it('should return a matching tenant', async () => {

            // Define a mock property to be associated with the tenant
            const fakeProperty: IProperty = {
                name: "myProperty",
                owner: fakeUser,
                id: "123456",
                address_line1: "1234 test st",
                address_line2: "Apt 101",
                city: "test",
                state: "test",
                zip: "12345",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Define a mock unit within the property
            const unit: IUnit = {
                id: "unit123",
                number: 101,
                property: fakeProperty,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Define a mock tenant with an associated unit and property
            const fakeTenant: ITenant = {
                id: "123456",
                property: fakeProperty, // Reuse the previously defined property
                tenant: fakeUser,
                startDate: new Date(),
                endDate: new Date(),
                unit: unit,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Mock the tenant repository's findOne method to return the fake tenant
            (tenantRepository.findOne as Mock).mockResolvedValue(fakeTenant);

            // Call the service method and verify that it returns the expected tenant
            const result = await tenantService.getTenantById("123456");
            expect(result).toEqual(fakeTenant); 
        });

    });




});