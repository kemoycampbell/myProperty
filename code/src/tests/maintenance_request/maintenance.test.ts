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
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

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
        // Mock user Repository's findOne function
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
        maintenanceRequestService = new MaintenanceRequestService(maintenanceRequestRepository as MaintenanceRequestRepository, userRepository as UserRepository, unitRepository as UnitRepository);
        
    });

    it("It should throw an user exception if the user id is not provided", async()=>{
        const userId = "";
        const unitId = fakeUnit.id
        const description = fakeMaintenanceRequest.description

        const maintaince = maintenanceRequestService.createMaintenanceRequest(userId, unitId, description);

        await(expect(maintaince)).rejects.toThrowError(UserException);
        await expect(maintaince).rejects.toThrowError("Requested User ID is required");
    })

    it("should successfully created the request", async ()=>{
        const userId = "123";
        const unitId = fakeUnit.id
        const description = fakeMaintenanceRequest.description;

        const maintaince = await maintenanceRequestService.createMaintenanceRequest(userId, unitId, description);

        expect(maintaince).toEqual(fakeMaintenanceRequest);


    })

        // constructor(maintenanceRequestRepository: MaintenanceRequestRepository, userRepository: UserRepository, unitRepository: UnitRepository) {
        //     this.maintenanceRequestRepository = maintenanceRequestRepository;
        //     this.userRepository = userRepository;
        //     this.unitRepository = unitRepository;
        // }
});