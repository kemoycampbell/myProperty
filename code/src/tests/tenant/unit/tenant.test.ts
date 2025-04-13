import { UserException } from "$lib/server/exceptions/UserException";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import type { IRole } from "$lib/server/models/entity/role/IRole";
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
import bcrypt from "bcryptjs";
import jwt from "$lib/server/jwt/jwt";


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

    let fakeTenant:ITenant = {
        id: "123456",
        property: {
            id:"1234"
        } as IProperty,
        tenant: fakeUser,
        startDate: new Date(),
        endDate: new Date(),
        unit: {"id":"1234"} as IUnit,
        createdAt: new Date(),
        updatedAt: new Date()
    }


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
        const fakeRolDB:IRole = {
            id: "123456",
            name: RoleType.TENANT,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const mockRoleRepository:Partial<RoleRepository> = {
            findByName: vi.fn().mockResolvedValue(fakeRolDB)
        }
        userService = new UserService(mockUserSave as UserRepository, mockRoleRepository as RoleRepository);

        //make the getByUserName method return the fake user
        userService.getByUsername = vi.fn();


        //we want to mock the findOne and save methods of the tenant repository
        tenantRepository = {
            findOne: vi.fn().mockResolvedValue(fakeTenant),
            save: vi.fn().mockReturnValue(fakeTenant),
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

    it('should successfully create a tenant account', async () => {
        const firstName = "test";
        const lastName = "test";
        const password = "password";
        const email ="test@gmail.com";

        //mock out jwt
        const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6ImFkbWluQG15cHJvcGVydHkuY29tIiwiaWF0IjoxNzQzMTA4MTgxLCJleHAiOjE3NDU3MDAxODF9.9tgSRVoGEmQF_XnJjpczM9H1d7CaUw2SXy7V2x6wvCU";;
        vi.spyOn(jwt, 'generate').mockReturnValue(fakeToken)

        const res = await tenantService.createTenantAccount(firstName, lastName, email, fakeUser.username, password);
        expect(res).toBeDefined();

        //contain the jwt header

        expect(res).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
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

    //testing the getTenantById method
    describe("Test getTenantById", () => {
        it('should throw an error if id is not provided', async () => {
            const id = "";
    
            const result = tenantService.getTenantById(id);
            await expect(result).rejects.toThrowError(
                new UserException("id is required", 400)
            );
        });
        it('should throw an error if tenant is not found', async () => {
            //mock the repository to return null
            (tenantRepository.findOne as Mock).mockResolvedValueOnce(null);
    
            const id = "123";
            const result = tenantService.getTenantById(id);
            await expect(result).rejects.toThrowError(
                new UserException("Tenant not found", 404)
            );
        });

        it('should return the tenant if found', async () => {
            const id = "123456";
            const result = await tenantService.getTenantById(id);
            expect(result).toBeDefined();
            expect(result).toBe(fakeTenant);
        });

        
    });

    //testing the rent method
    describe("Test rent", () => {
        it('should throw an error if tenant is not provided', async () => {
            const tenant: Partial<ITenant> = {
                unit: fakeTenant.unit,
                startDate: new Date(),
                endDate: new Date()
            };
    
            const result = tenantService.rent(tenant);
            await expect(result).rejects.toThrowError(
                new UserException("Tenant is required", 400)
            );
        });

        it('should throw an error if unit is not provided', async () => {
            const tenant: Partial<ITenant> = {
                tenant: fakeUser,
                startDate: new Date(),
                endDate: new Date()
            };
    
            const result = tenantService.rent(tenant);
            await expect(result).rejects.toThrowError(
                new UserException("Unit is required", 400)
            );
        });

        it('should throw an error if start date is not provided', async () => {
            const tenant: Partial<ITenant> = {
                tenant: fakeUser,
                unit: fakeTenant.unit,
                endDate: new Date()
            };
    
            const result = tenantService.rent(tenant);
            await expect(result).rejects.toThrowError(
                new UserException("start date is required", 400)
            );
        });

        it('should throw an error if end date is not provided', async () => {
            const tenant: Partial<ITenant> = {
                tenant: fakeUser,
                unit: fakeTenant.unit,
                startDate: new Date()
            };
    
            const result = tenantService.rent(tenant);
            await expect(result).rejects.toThrowError(
                new UserException("end date is required", 400)
            );
        });

        it('should throw an error if unit is not found', async () => {
            const tenant: Partial<ITenant> = {
                tenant: fakeUser,
                unit: { id: "nonexistent" } as IUnit,
                startDate: new Date(),
                endDate: new Date()
            };

            //mock the userService.getByUsername to return the fake user
            (userService.getByUsername as Mock).mockResolvedValueOnce(fakeUser);
    
            (unitRepository.findOne as Mock).mockResolvedValueOnce(null);
    
            const result = tenantService.rent(tenant);
            await expect(result).rejects.toThrowError(
                new UserException("Unit not found", 404)
            );
        });

        it('should save the tenant if all required fields are provided', async () => {
            const tenant: Partial<ITenant> = {
                tenant: fakeUser,
                unit: fakeTenant.unit,
                startDate: new Date(),
                endDate: new Date()
            };

            //mock the userService.getByUsername to return the fake user
            (userService.getByUsername as Mock).mockResolvedValueOnce(fakeUser);
    
            (unitRepository.findOne as Mock).mockResolvedValueOnce(fakeTenant.unit);
    
            const result = await tenantService.rent(tenant);
            expect(result).toBeDefined();
            expect(result).toBe(fakeTenant);
        });
    });




});