import { UserException } from "$lib/server/exceptions/UserException";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import type { PropertyService } from "$lib/server/services/propertyService";
import { UnitService } from "$lib/server/services/unitService";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

describe("UnitService Tests", () => {

    let unitService:UnitService;
    let unitRepository:Partial<UnitRepository>;
    let propertyService:Partial<PropertyService>;

    let fakeUnit:IUnit;
    let fakeProperty:IProperty;
    let fakeUser: IUser;

    beforeEach(() => {

        //fake values
        const fakeRole = new Role();
        fakeRole.name = RoleType.OWNER;

        fakeUser = {
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

        fakeProperty = {
            id: "123456",
            owner: fakeUser,
            name: "test",
            address_line1: "1234 test st",
            address_line2: "",
            city: "test",
            state: "test",
            zip: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        fakeUnit = {
            id: "123456",
            number: 123,
            property: fakeProperty,
            createdAt: new Date(),
            updatedAt: new Date()
        }



        //we want to mock the unit repository
        unitRepository = {
            save: vi.fn().mockResolvedValue(fakeUnit),
            findOne: vi.fn().mockResolvedValue(fakeUnit)
        }

        propertyService = {
            getPropertyById: vi.fn().mockResolvedValue(fakeProperty)
        }

        unitService = new UnitService(unitRepository as UnitRepository, propertyService as PropertyService);

    });

    describe("create unit", ()=>{
        it('should throw a user exception if the property is not provided', async () => {
            const unit: Partial<IUnit> = {
                number: 123
            };
    
            await expect(unitService.create(unit)).rejects.toThrowError(UserException);
    
            await expect(unitService.create(unit)).rejects.toThrowError("Property is required");
        });
    
        it('should throw a user exception if the number is not provided', async () => {
            const unit: Partial<IUnit> = {
                property: fakeProperty
            };
    
            await expect(unitService.create(unit)).rejects.toThrowError(UserException);
    
            await expect(unitService.create(unit)).rejects.toThrowError("number is required");
        });
    
        it('should save the unit if all required fields are provided', async () => {
            const res = await unitService.create(fakeUnit);
            expect(res).toBeDefined();
            expect(res).toBe(fakeUnit);
        });
    })



    describe("getById", () => {
        it('should throw a user exception if the id is not provided', async () => {
            const id = "";
    
            const result = unitService.getById(id);
            await expect(result).rejects.toThrowError(
                new UserException("Unit ID is required", 400)
            );
        } );  

        it('should throw a user exception if the unit is not found', async () => {
            //mock the repository to return null
            (unitRepository.findOne as Mock).mockResolvedValueOnce(null);
    
            const id = "123";
            const result = unitService.getById(id);
            await expect(result).rejects.toThrowError(
                new UserException("Unit not found", 400)
            );
        } );

        it('should return the unit if found', async () => {
            const id = "123456";
            const result = await unitService.getById(id);
            expect(result).toBeDefined();
            expect(result).toBe(fakeUnit);
        } );

    });
});