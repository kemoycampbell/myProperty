import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { PropertyService } from "$lib/server/services/propertyService";
import { UserException } from "$lib/server/exceptions/UserException";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { User } from "$lib/server/models/entity/User/User";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";


describe("PropertyService Tests", () => {

    let propertyService: PropertyService;

    //we are using partial because we only want to mock certain methods instead of everyting
    //that comes in the ORM repository
    let propertyRepository: Partial<PropertyRepository>;
    let fakePropertyOwner:IUser;
    

    beforeEach(()=>{
        //we want to mock the property repository
        propertyRepository = {
            save: vi.fn(),
            findOne: vi.fn(),
            find: vi.fn(),
            remove: vi.fn()
        } as Partial<PropertyRepository>;

        //pass the mocked repository to the property service
        propertyService = new PropertyService(propertyRepository as PropertyRepository);
        const fakeRole = new Role();
        fakeRole.name = RoleType.OWNER;

        fakePropertyOwner = {
            id: "123456",
            email: "iWantToSeeTheManager@karen.com",
            username: "karen",
            password: "password",
            role: fakeRole,
            firstName: "Karen",
            lastName: "Karenson",
            createdAt: new Date(),
            updatedAt: new Date()
        } 
    })

    it('should throw an error if owner is not provided', async () => {
        const property: Partial<IProperty> = {
            name: "test",
            address_line1: "1234 test st",
            city: "test",
            state: "test",
            zip: "12345"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("Owner is required", 400)
        );
    });

    it('should throw an error if name is not provided', async()=>{
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            address_line1: "1234 test st",
            city: "test",
            state: "test",
            zip: "12345"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("name is required", 400)
        );
    })

    it('should throw an error if address_line1 is not provided', async()=>{
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            name: "test",
            city: "test",
            state: "test",
            zip: "12345"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("address_line1, city, state, zip are required", 400)
        );
    })

    it('should throw an error if city is not provided', async()=>{
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            name: "test",
            address_line1: "1234 test st",
            state: "test",
            zip: "12345"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("address_line1, city, state, zip are required", 400)
        );
    })

    it('should throw an error if state is not provided', async()=>{
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            name: "test",
            address_line1: "1234 test st",
            city: "test",
            zip: "12345"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("address_line1, city, state, zip are required", 400)
        );
    })

    it('should throw an error if zip is not provided', async()=>{
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            name: "test",
            address_line1: "1234 test st",
            city: "test",
            state: "test"
        };

        await expect(propertyService.createProperty(property)).rejects.toThrowError(
            new UserException("address_line1, city, state, zip are required", 400)
        );
    })

    it('should save the property if all required fields are provided', async()=>{

        //this is what we will want the repository to fake return
        const fakeProperty:IProperty = {
            id: "123456",
            owner: fakePropertyOwner,
            name: "test",
            address_line1: "1234 test st",
            address_line2: "",
            city: "test",
            state: "test",
            zip: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        (propertyRepository.save as Mock).mockResolvedValue(fakeProperty);

        //this is what we will pass to the service
        const property: Partial<IProperty> = {
            owner: fakePropertyOwner,
            name: "test",
            address_line1: "1234 test st",
            city: "test",
            state: "test",
            zip: "12345"
        };

        const res = await propertyService.createProperty(property);

        expect(res).toEqual(fakeProperty);
    });

    describe("Test getPropertyById", () => {

        it("should throw an error if id is not provided", async () => {
            //pass the data to the function and store the promise without invoking it
            const getPropertyById = propertyService.getPropertyById("");
        
            //Assert and invoke the promise
            await expect(getPropertyById).rejects.toThrow(UserException);
            await expect(getPropertyById).rejects.toThrowError("id is required");
        });

        it('should return a matching property', async () => {

            // Define a mock property
            const fakeProperty: IProperty = {
                name: "myProperty",
                owner: fakePropertyOwner,
                id: "123456",
                address_line1: "1234 test st",
                address_line2: "Apt 101",
                city: "test",
                state: "test",
                zip: "12345",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Mock the property repository's findOne method to return the fake property
            (propertyRepository.findOne as Mock).mockResolvedValue(fakeProperty);

            // Call the service method and verify that it returns the expected property
            const result = await propertyService.getPropertyById("123456");
            expect(result).toEqual(fakeProperty); 
        });
    });

    describe("Test getAllPropertiesByOwner", () => {

        it("should throw an error if owner ID is not provided", async () => {
            const getAllProperties = propertyService.getAllPropertiesByOwner("");
            await expect(getAllProperties).rejects.toThrow(UserException);
            await expect(getAllProperties).rejects.toThrowError("Owner ID is required");
        });
    
        it("should throw an error if no properties are found for the given owner", async () => {
            (propertyRepository.find as Mock).mockResolvedValue([]);
    
            const getAllProperties = propertyService.getAllPropertiesByOwner("non-existing-id");
    
            await expect(getAllProperties).rejects.toThrow(UserException);
            await expect(getAllProperties).rejects.toThrowError("No properties found for the given owner");
        });
    
        it("should return properties for the given owner", async () => {
            const fakeProperty: IProperty = {
                id: "123456",
                owner: fakePropertyOwner,
                name: "test property",
                address_line1: "1234 test st",
                address_line2: "Unit A",
                city: "Testville",
                state: "TS",
                zip: "54321",
                createdAt: new Date(),
                updatedAt: new Date()
            };
    
            (propertyRepository.find as Mock).mockResolvedValue([fakeProperty]);
    
            const properties = await propertyService.getAllPropertiesByOwner(fakePropertyOwner.id);
            expect(properties).toEqual([fakeProperty]);
        });
    
    });

    describe("Test deleteProperty", () => {
        it("should throw an error if id is not provided", async () => {
            const deleteProperty = propertyService.deleteProperty("");
            await expect(deleteProperty).rejects.toThrow(UserException);
            await expect(deleteProperty).rejects.toThrow("id is required");
        });
    
        it("should throw an error if property is not found", async () => {
            // Mock findOne to return undefined
            (propertyRepository.findOne as Mock).mockResolvedValue(undefined);
    
            const deleteProperty = propertyService.deleteProperty("non-existing-id");
            await expect(deleteProperty).rejects.toThrow(UserException);
            await expect(deleteProperty).rejects.toThrow("Property not found");
        });
    
        it("should successfully delete the property if it exists", async () => {
            const fakeProperty: IProperty = {
                id: "prop123",
                name: "Test Property",
                owner: fakePropertyOwner,
                address_line1: "1234 Test St",
                address_line2: "Apt 42",
                city: "City",
                state: "State",
                zip: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
    
            // Mock findOne to return the fake property
            (propertyRepository.findOne as Mock).mockResolvedValue(fakeProperty);
    
            // Mock remove to resolve
            (propertyRepository.remove as Mock).mockResolvedValue(undefined);
    
            await expect(propertyService.deleteProperty(fakeProperty.id)).resolves.toBeUndefined();
            expect(propertyRepository.findOne).toHaveBeenCalledWith({ where: { id: fakeProperty.id } });
            expect(propertyRepository.remove).toHaveBeenCalledWith(fakeProperty);
        });
    });

    describe("Test updateProperty", () => {
        it("should throw an error if id is not provided", async () => {
            const updateProperty = propertyService.updateProperty("", { name: "Updated Name" });
            await expect(updateProperty).rejects.toThrow(UserException);
            await expect(updateProperty).rejects.toThrow("id is required");
        });
    
        it("should throw an error if property is not found", async () => {
            (propertyRepository.findOne as Mock).mockResolvedValue(undefined);
    
            const updateProperty = propertyService.updateProperty("non-existing-id", { name: "Updated Name" });
            await expect(updateProperty).rejects.toThrow(UserException);
            await expect(updateProperty).rejects.toThrow("Property not found");
        });
    
        it("should update the property and return the updated object", async () => {
            const existingProperty: IProperty = {
                id: "prop123",
                name: "Old Name",
                owner: fakePropertyOwner,
                address_line1: "123 Main St",
                address_line2: "",
                city: "City",
                state: "State",
                zip: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
    
            const updates: Partial<IProperty> = {
                name: "Updated Name",
                city: "Updated City"
            };
    
            const expectedUpdated = {
                ...existingProperty,
                ...updates
            };
    
            (propertyRepository.findOne as Mock).mockResolvedValue(existingProperty);
            (propertyRepository.save as Mock).mockResolvedValue(expectedUpdated);
    
            const result = await propertyService.updateProperty(existingProperty.id, updates);
    
            expect(propertyRepository.findOne).toHaveBeenCalledWith({ where: { id: existingProperty.id } });
            expect(propertyRepository.save).toHaveBeenCalledWith(expectedUpdated);
            expect(result.name).toBe("Updated Name");
            expect(result.city).toBe("Updated City");
        });
    });    
});