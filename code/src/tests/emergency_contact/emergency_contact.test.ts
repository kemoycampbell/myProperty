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
    }

    const fakeEmergencyContact: IEmergencyContact = {
        id: "1",
        userTenantID: "1",
        firstName: "tony",
        lastName: "smith",
        email: "tonysmith@example.com",
        phone: "1231231234",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        // Mock User Repository's findOne function
        userRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUserTenant)
        } as Partial<UserRepository>;

        emergencyContactRepository = {
            save: vi.fn().mockResolvedValue(fakeEmergencyContact)
        } as Partial<EmergencyContactRepository>;

        emergencyContactService = new EmergencyContactService(
            emergencyContactRepository as EmergencyContactRepository,
            userRepository as UserRepository
        );
    });

    it("should throw a user exception if the tenant user id is not provided", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "",
            fakeEmergencyContact.firstName,
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.email,
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Requested Tenant User ID is required");
    })

    it("should throw a user exception if the emergency contact first name is not provided", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            "",
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.email,
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid First Name");
    })

    it("should throw a user exception if the emergency contact first name is less than 2 characters long", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            "a",
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.email,
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid First Name - it is too short");
    })
    
    it("should throw a user exception if the emergency contact last name is not provided", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            "",
            fakeEmergencyContact.email,
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Last Name");
    })

    it("should throw a user exception if the emergency contact last name is less than 2 characters long", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            "a",
            fakeEmergencyContact.email,
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Last Name - it is too short");
    })

    it("should throw a user exception if the emergency contact email is not provided", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            fakeEmergencyContact.lastName,
            "",
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Email Address");
    })

    it("should throw a user exception if the emergency contact email is not a valid format", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.firstName + fakeEmergencyContact.lastName + "atExample.com",
            fakeEmergencyContact.phone
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Format Email Address");
    })

    it("should throw a user exception if the emergency contact phone number is not provided", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.email,
            ""
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Phone Number");
    })

    it("should throw a user exception if the emergency contact phone number is not a valid format", async() => {
        const emergencyConctact = emergencyContactService.createEmergencyContact(
            "1",
            fakeEmergencyContact.firstName,
            fakeEmergencyContact.lastName,
            fakeEmergencyContact.email,
            "123"
        );

        await(expect(emergencyConctact)).rejects.toThrowError(UserException);
        await expect(emergencyConctact).rejects.toThrowError("Invalid Format Phone Number");
    })
});