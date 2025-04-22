import { UserException } from "$lib/server/exceptions/UserException";
import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import type { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestService } from "$lib/server/services/maintenanceRequestService";
import { describe, it, expect, beforeEach, vi } from "vitest";

let maintenanceRequestRepository: Partial<MaintenanceRequestRepository>;
let unitRepository: Partial<UnitRepository>;
let userRepository: Partial<UserRepository>;
let maintenanceRequestService: MaintenanceRequestService;

describe("MaintenanceRequestServie Tests", () => {

        const fakeRole = new Role();
        fakeRole.name = RoleType.OWNER;
    
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

        const fakeProperty:IProperty = {
            id: "123",
            name: "some property",
            owner: fakeUser,
            address_line1: "123",
            address_line2: "123",
            city: "123",
            state: "123",
            zip: "123",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const fakeUnit: IUnit = {
            id: "123456",
            number: 5,
            property: fakeProperty,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const fakeMaintenanceRequest: IMaintenanceRequest = {
            id: "123",
            userRequestedId: fakeUser.id,
            unitId: fakeUnit.id,
            description: "hello world",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

    beforeEach(() => {
        // Mock User Repository's findOne function
        userRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUser)
        } as Partial<UserRepository>;

        unitRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUnit)
        } as Partial<UnitRepository>;

        maintenanceRequestRepository = {
            save: vi.fn().mockResolvedValue(fakeMaintenanceRequest)
        } as Partial<MaintenanceRequestRepository>;

        //initalize the service with the mock repositories
        maintenanceRequestService = new MaintenanceRequestService(
            maintenanceRequestRepository as MaintenanceRequestRepository, 
            userRepository as UserRepository, 
            unitRepository as UnitRepository
        );
    });

    it("should throw a user exception if the user id is not provided", async() => {
        const userId = "";
        const unitId = fakeUnit.id;
        const description = fakeMaintenanceRequest.description;

        const maintenance = maintenanceRequestService.createMaintenanceRequest(userId, unitId, description);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Requested User ID is required");
    })

    it("should throw a user exception if the unit id is not provided", async() => {
        const userId = fakeUser.id;
        const unitId = "";
        const description = fakeMaintenanceRequest.description;

        const maintenance = maintenanceRequestService.createMaintenanceRequest(
            userId, 
            unitId, 
            description
        );

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Unit ID is required");
    })

    it("should throw a user exception if the maintenance request description is not provided", async() => {
        const userId = fakeUser.id;
        const unitId = fakeUnit.id;
        const description = "";

        const maintenance = maintenanceRequestService.createMaintenanceRequest(userId, unitId, description);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Maintenance Request Description is required");
    })

    it("should successfully create a maintenance request", async () => {
        const userId = fakeUser.id;
        const unitId = fakeUnit.id;
        const description = fakeMaintenanceRequest.description;

        const maintenance = await maintenanceRequestService.createMaintenanceRequest(userId, unitId, description);

        expect(maintenance).toEqual(fakeMaintenanceRequest);
    })

    it('should return a list of maintenance requests by operator id', async () => {
        const operatorId = fakeUser.id;
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const result = await maintenanceRequestService.getMaintenanceRequestByOperatorId(operatorId);

        expect(result).toEqual(mockMaintenanceRequest);
        expect(maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId).toHaveBeenCalledWith(operatorId);
    });

    // Tests for getMaintenanceRequestByOwnerId
    it('should throw a user exception if the owner id is not provided', async () => {
        const ownerId = "";
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOwnerId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOwnerId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestByOwnerId(ownerId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Owner ID is required");
    });

    it('should throw a user exception if no maintenance requests are found', async () => {
        const ownerId = fakeUser.id;
        const mockMaintenanceRequest = [];

        // Mock the getAllMaintenanceRequestByOwnerId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOwnerId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestByOwnerId(ownerId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("No Maintenance Requests found");
    });


    it('should return a list of maintenance requests by owner id', async () => {
        const ownerId = fakeUser.id;
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOwnerId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOwnerId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const result = await maintenanceRequestService.getMaintenanceRequestByOwnerId(ownerId);

        expect(result).toEqual(mockMaintenanceRequest);
        expect(maintenanceRequestRepository.getAllMaintenanceRequestByOwnerId).toHaveBeenCalledWith(ownerId);
    });

    // Tests for getMaintenanceRequestByOperatorId
    it('should throw a user exception if the operator id is not provided', async () => {
        const operatorId = "";
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestByOperatorId(operatorId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Operator ID is required");
    });

    it('should throw a user exception if no maintenance requests are found for the operator id', async () => {
        const operatorId = fakeUser.id;
        const mockMaintenanceRequest = null;

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestByOperatorId(operatorId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("No Maintenance Requests found");
    });

    it('should return a list of maintenance requests by operator id', async () => {
        const operatorId = fakeUser.id;
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const result = await maintenanceRequestService.getMaintenanceRequestByOperatorId(operatorId);

        expect(result).toEqual(mockMaintenanceRequest);
        expect(maintenanceRequestRepository.getAllMaintenanceRequestByOperatorId).toHaveBeenCalledWith(operatorId);
    });

    // Tests for getMaintenanceRequestById
    it('should throw a user exception if the maintenance request id is not provided', async () => {
        const maintenanceRequestId = "";
        const mockMaintenanceRequest = [fakeMaintenanceRequest];

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.findOne = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestById(maintenanceRequestId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("Maintenance Request ID is required");
    });

    it('should throw a user exception if no maintenance requests are found for the maintenance request id', async () => {
        const maintenanceRequestId = fakeMaintenanceRequest.id;
        const mockMaintenanceRequest = null;

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.findOne = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const maintenance = maintenanceRequestService.getMaintenanceRequestById(maintenanceRequestId);

        await(expect(maintenance)).rejects.toThrowError(UserException);
        await expect(maintenance).rejects.toThrowError("No Maintenance Requests found with that ID");
    });

    it('should return a maintenance request by id', async () => {
        const maintenanceRequestId = fakeMaintenanceRequest.id;
        const mockMaintenanceRequest = fakeMaintenanceRequest;

        // Mock the getAllMaintenanceRequestByOperatorId method
        maintenanceRequestRepository.findOne = vi.fn().mockResolvedValue(mockMaintenanceRequest);

        const result = await maintenanceRequestService.getMaintenanceRequestById(maintenanceRequestId);

        expect(result).toEqual(mockMaintenanceRequest);
        expect(maintenanceRequestRepository.findOne).toHaveBeenCalledWith({
            where: {
                id: maintenanceRequestId
            }
        });
    });

    // Tests for getMaintenanceRequests
    it('should return a list of all maintenance requests', async () => {
        const mockMaintenanceRequests = [fakeMaintenanceRequest];

        // Mock the find method
        maintenanceRequestRepository.find = vi.fn().mockResolvedValue(mockMaintenanceRequests);

        const result = await maintenanceRequestService.getMaintenanceRequests();

        expect(result).toEqual(mockMaintenanceRequests);
        expect(maintenanceRequestRepository.find).toHaveBeenCalled();
    });
});