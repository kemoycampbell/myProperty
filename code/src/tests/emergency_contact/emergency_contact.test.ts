import { UserException } from "$lib/server/exceptions/UserException";
import type { IEmergencyContact } from "$lib/server/models/entity/emergency_contact/IEmergencyContact";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import { EmergencyContactRepository } from "$lib/server/repositories/emergency_contact/emergencyContactRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { EmergencyContactService } from "$lib/server/services/emergencyContactService";
import { beforeEach, describe, expect, it, vi } from "vitest";

let userRepository: Partial<UserRepository>;
let emergencyContactRepository: Partial<EmergencyContactRepository>;
let emergencyContactService: EmergencyContactService;

describe("EmergencyContactService Test", () => {
    const fakeRole = new Role();
    fakeRole.name = RoleType.TENANT;

    const fakeUserTenant: IUser = {
        id: "1",
        firstName: "john",
        lastName: "smith",
        email: "johnsmith@example.com",
        username: "johnsmith",
        password: "password",
        role: fakeRole,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const fakeEmergencyContact: IEmergencyContact = {
        id: "1",
        userTenantID: "1",
        firstName: "tony",
        lastName: "smith",
        email: "tonysmith@example.com",
        phone: "1231231234",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        // Mock User Repository's findOne function
        userRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUserTenant)
        } as Partial<UserRepository>;

        emergencyContactRepository = {
            save: vi.fn().mockResolvedValue(fakeEmergencyContact),
            findOne: vi.fn().mockResolvedValue(fakeEmergencyContact),
            find: vi.fn().mockResolvedValue([fakeEmergencyContact])
        } as Partial<EmergencyContactRepository>;

        emergencyContactService = new EmergencyContactService(
            emergencyContactRepository as EmergencyContactRepository,
            userRepository as UserRepository
        );
    });

    describe("createEmergencyContact", () => {
        it("should throw a user exception if the tenant user id is not provided", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Requested Tenant User ID is required");
        });

        it("should throw a user exception if the emergency contact first name is not provided", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                "",
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid First Name");
        });

        it("should throw a user exception if the emergency contact first name is less than 2 characters long", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                "a",
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid First Name - it is too short");
        });

        it("should throw a user exception if the emergency contact last name is not provided", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                "",
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Last Name");
        });

        it("should throw a user exception if the emergency contact last name is less than 2 characters long", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                "a",
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Last Name - it is too short");
        });

        it("should throw a user exception if the emergency contact email is not provided", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                "",
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Email Address");
        });

        it("should throw a user exception if the emergency contact email is not a valid format", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.firstName + fakeEmergencyContact.lastName + "atExample.com",
                fakeEmergencyContact.phone
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Format Email Address");
        });

        it("should throw a user exception if the emergency contact phone number is not provided", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                ""
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Phone Number");
        });

        it("should throw a user exception if the emergency contact phone number is not a valid format", async () => {
            const emergencyContact = emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                "123"
            );

            await expect(emergencyContact).rejects.toThrowError(UserException);
            await expect(emergencyContact).rejects.toThrowError("Invalid Format Phone Number");
        });

        it("should create and save the emergency contact if all fields are valid", async () => {
            const result = await emergencyContactService.createEmergencyContact(
                "1",
                fakeEmergencyContact.firstName,
                fakeEmergencyContact.lastName,
                fakeEmergencyContact.email,
                fakeEmergencyContact.phone
            );

            expect(result).toBeDefined();
            expect(result).toEqual(fakeEmergencyContact);
        });
    });

    describe("getEmergencyContactById", () => {
        it("should throw a user exception if the emergency contact id is not provided", async () => {
            const result = emergencyContactService.getEmergencyContactById("");
            await expect(result).rejects.toThrowError(UserException);
            await expect(result).rejects.toThrowError("Emergency Contact ID is required");
        });

        it("should throw a user exception if the emergency contact is not found", async () => {
            (emergencyContactRepository.findOne as Mock).mockResolvedValue(null);

            const result = emergencyContactService.getEmergencyContactById("non-existing-id");
            await expect(result).rejects.toThrowError(UserException);
            await expect(result).rejects.toThrowError("Emergency Contact not found");
        });

        it("should return the emergency contact if it exists", async () => {
            (emergencyContactRepository.findOne as Mock).mockResolvedValue(fakeEmergencyContact);

            const result = await emergencyContactService.getEmergencyContactById(fakeEmergencyContact.id);
            expect(result).toBeDefined();
            expect(result).toEqual(fakeEmergencyContact);
        });
    });

    describe("getEmergencyContactsByUserId", () => {
        it("should throw a user exception if the tenant user id is not provided", async () => {
            const result = emergencyContactService.getEmergencyContactsByUserId("");
            await expect(result).rejects.toThrowError(UserException);
            await expect(result).rejects.toThrowError("Tenant User ID is required");
        });
    
        it("should return an empty array if no emergency contacts are found for the given user", async () => {
            // Mockear el repositorio para devolver un array vacío
            (emergencyContactRepository.find as Mock).mockResolvedValue([]);
    
            const result = await emergencyContactService.getEmergencyContactsByUserId("non-existing-id");
            expect(result).toBeDefined();
            expect(result.length).toBe(0); // Verificar que el resultado sea un array vacío
        });
    
        it("should return the emergency contacts associated with the given user", async () => {
            // Mockear el repositorio para devolver un array con un contacto de emergencia
            (emergencyContactRepository.find as Mock).mockResolvedValue([fakeEmergencyContact]);
    
            const result = await emergencyContactService.getEmergencyContactsByUserId(fakeUserTenant.id);
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0); // Verificar que el resultado contenga al menos un contacto
            expect(result[0]).toEqual(fakeEmergencyContact); // Verificar que el primer contacto sea el esperado
        });
    });
});