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
    let unitService: UnitService;
    let unitRepository: Partial<UnitRepository>;
    let propertyService: Partial<PropertyService>;

    let fakeUnit: IUnit;
    let fakeProperty: IProperty;
    let fakeUser: IUser;

    beforeEach(() => {
        // Crear un usuario falso
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
            updatedAt: new Date(),
        };

        // Crear una propiedad falsa
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
            updatedAt: new Date(),
        };

        // Crear una unidad falsa
        fakeUnit = {
            id: "123456",
            number: 123,
            property: fakeProperty,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mockear el repositorio de unidades
        unitRepository = {
            save: vi.fn().mockResolvedValue(fakeUnit),
            findOne: vi.fn().mockResolvedValue(fakeUnit),
            find: vi.fn().mockResolvedValue([fakeUnit]),
        };

        // Mockear el servicio de propiedades
        propertyService = {
            getPropertyById: vi.fn().mockResolvedValue(fakeProperty),
        };

        // Instanciar el servicio de unidades
        unitService = new UnitService(unitRepository as UnitRepository, propertyService as PropertyService);
    });

    describe("create unit", () => {
        it("should throw a user exception if the property is not provided", async () => {
            const unit: Partial<IUnit> = {
                number: 123,
            };

            await expect(unitService.create(unit)).rejects.toThrowError(UserException);
            await expect(unitService.create(unit)).rejects.toThrowError("Property is required");
        });

        it("should throw a user exception if the number is not provided", async () => {
            const unit: Partial<IUnit> = {
                property: fakeProperty,
            };

            await expect(unitService.create(unit)).rejects.toThrowError(UserException);
            await expect(unitService.create(unit)).rejects.toThrowError("Number is required");
        });

        it("should save the unit if all required fields are provided", async () => {
            const res = await unitService.create(fakeUnit);
            expect(res).toBeDefined();
            expect(res).toBe(fakeUnit);
        });
    });

    describe("getById", () => {
        it("should throw a user exception if the id is not provided", async () => {
            const id = "";

            const result = unitService.getById(id);
            await expect(result).rejects.toThrowError(new UserException("Unit ID is required", 400));
        });

        it("should throw a user exception if the unit is not found", async () => {
            (unitRepository.findOne as Mock).mockResolvedValueOnce(null);

            const id = "123";
            const result = unitService.getById(id);
            await expect(result).rejects.toThrowError(new UserException("Unit not found", 400));
        });

        it("should return the unit if found", async () => {
            const id = "123456";
            const result = await unitService.getById(id);
            expect(result).toBeDefined();
            expect(result).toBe(fakeUnit);
        });
    });

    describe("getByPropertyId", () => {
        it("should throw a user exception if the property ID is not provided", async () => {
            const propertyId = "";

            const result = unitService.getByPropertyId(propertyId);
            await expect(result).rejects.toThrowError(new UserException("Property ID is required", 400));
        });

        it("should throw a user exception if no units are found for the given property", async () => {
            (unitRepository.find as Mock).mockResolvedValue([]);

            const propertyId = "non-existing-property-id";
            const result = unitService.getByPropertyId(propertyId);
            await expect(result).rejects.toThrowError(new UserException("No units found for the given property", 404));
        });

        it("should return the units associated with the given property", async () => {
            const propertyId = "123456";
            const result = await unitService.getByPropertyId(propertyId);
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toBe(fakeUnit);
        });
    });
});