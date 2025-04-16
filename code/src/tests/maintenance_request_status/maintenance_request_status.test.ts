import { UserException } from "$lib/server/exceptions/UserException";
import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import type { MaintenanceRequest } from "$lib/server/models/entity/maintenance_request/MaintenanceRequest";
import type { IMaintenanceRequestStatus } from "$lib/server/models/entity/maintenance_request_status/IMaintenanceRequestStatus";
import { MaintenanceStatus, MaintenanceStatusType } from "$lib/server/models/entity/maintenance_status/MaintenanceStatus";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import type { MaintenanceRequestStatusRepository } from "$lib/server/repositories/maintenance_request_status/maintenanceRequestStatusRepository";
import type { MaintenanceStatusRepository } from "$lib/server/repositories/maintenance_status/MaintenanceStatusRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestStatusService } from "$lib/server/services/maintenanceRequestStatusService";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

let maintenanceRequestRepository: Partial<MaintenanceRequestRepository>;
let userRepository: Partial<UserRepository>;
let maintenanceStatusRepository: Partial<MaintenanceStatusRepository>;
let maintenanceRequestStatusService: MaintenanceRequestStatusService;

describe("MaintenanceRequestStatus Tests", () => {
    const fakeMaintenanceRequest: IMaintenanceRequest = {
        id: "1",
        userRequestedId: "1",
        unitId: "1",
        description: "a fake maintenance request",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const fakeRole = new Role();
    fakeRole.name = RoleType.MAINTENANCE_OPERATOR;

    const fakeUser: IUser = {
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

    const fakeStatus = new MaintenanceStatus();
    fakeStatus.name = MaintenanceStatusType.NEW;

    const fakeMaintenanceRequestStatus: IMaintenanceRequestStatus = {
        id: "1",
        maintenanceRequestId: "123",
        userOperatorId: "1",
        status: fakeStatus,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        // Mock Maintenance Request Repository's findOne function
        maintenanceRequestRepository = {
            findOne: vi.fn().mockResolvedValue(fakeMaintenanceRequest)
        } as Partial<MaintenanceRequestRepository>;

        //  Mock User Repository's findOne function
        userRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUser)
        } as Partial<UserRepository>;

        maintenanceStatusRepository = {
            findByName: vi.fn().mockResolvedValue(fakeStatus)
        } as Partial<MaintenanceStatusRepository>;

        maintenanceRequestStatusService = new MaintenanceRequestStatusService(
            maintenanceRequestRepository as MaintenanceRequestRepository,
            userRepository as UserRepository,
            maintenanceStatusRepository as MaintenanceStatusRepository
        );
    });

    it("should throw a user exception if the maintenance request id is not provided", async() => {
        const maintenanceRequestId = "";
        const userOperatorId = fakeUser.id;
        const status = fakeStatus.name;

        const maintenanceRequestStatus = maintenanceRequestStatusService.createMaintenanceRequestStatus(
            maintenanceRequestId,
            userOperatorId,
            status
        );

        await(expect(maintenanceRequestStatus)).rejects.toThrowError(UserException);
        await expect(maintenanceRequestStatus).rejects.toThrowError("Maintenance Request ID is required");
    })

    it("should throw a user exception if the operator id is not provided", async() => {
        const maintenanceRequestId = fakeMaintenanceRequest.id;
        const userOperatorId = "";
        const status = fakeStatus.name;

        const maintenanceRequestStatus = maintenanceRequestStatusService.createMaintenanceRequestStatus(
            maintenanceRequestId,
            userOperatorId,
            status
        );

        await(expect(maintenanceRequestStatus)).rejects.toThrowError(UserException);
        await expect(maintenanceRequestStatus).rejects.toThrowError("Maintenance Operator ID is required");
    })

    it("should throw a user exception if the maintenance status id is not provided", async() => {
        const maintenanceRequestId = fakeMaintenanceRequest.id;
        const userOperatorId = fakeUser.id;
        const status = null;

        const maintenanceRequestStatus = maintenanceRequestStatusService.createMaintenanceRequestStatus(
            maintenanceRequestId,
            userOperatorId,
            status
        );

        await(expect(maintenanceRequestStatus)).rejects.toThrowError(UserException);
        await expect(maintenanceRequestStatus).rejects.toThrowError("Maintenance Status is required");
    })
});