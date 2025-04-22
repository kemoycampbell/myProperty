import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserException } from "$lib/server/exceptions/UserException";
import { MaintenanceRequestStatusService } from "$lib/server/services/maintenanceRequestStatusService";
import { MaintenanceStatusType, MaintenanceStatus } from "$lib/server/models/entity/maintenance_status/MaintenanceStatus";
import type { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import type { MaintenanceStatusRepository } from "$lib/server/repositories/maintenance_status/MaintenanceStatusRepository";
import type { MaintenanceRequestStatusRepository } from "$lib/server/repositories/maintenance_request_status/maintenanceRequestStatusRepository";
import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { IMaintenanceRequestStatus } from "$lib/server/models/entity/maintenance_request_status/IMaintenanceRequestStatus";

let service: MaintenanceRequestStatusService;
let maintenanceRequestRepository: Partial<MaintenanceRequestRepository>;
let userRepository: Partial<UserRepository>;
let maintenanceStatusRepository: Partial<MaintenanceStatusRepository>;
let maintenanceRequestStatusRepository: Partial<MaintenanceRequestStatusRepository>;

const fakeMaintenanceRequest: IMaintenanceRequest = {
  id: "1",
  userRequestedId: "user1",
  unitId: "unit1",
  description: "Test request",
  createdAt: new Date(),
  updatedAt: new Date()
};

const fakeUser: IUser = {
  id: "user1",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  username: "testuser",
  password: "pass",
  role: { name: "MAINTENANCE_OPERATOR" } as any,
  createdAt: new Date(),
  updatedAt: new Date()
};

const fakeStatus = new MaintenanceStatus();
fakeStatus.name = MaintenanceStatusType.NEW;

const fakeRequestStatus: IMaintenanceRequestStatus = {
  id: "status1",
  maintenanceRequestId: "1",
  userOperatorId: "user1",
  status: fakeStatus,
  createdAt: new Date(),
  updatedAt: new Date()
};

beforeEach(() => {
  maintenanceRequestRepository = {
    findOne: vi.fn().mockResolvedValue(fakeMaintenanceRequest)
  };
  userRepository = {
    findOne: vi.fn().mockResolvedValue(fakeUser)
  };
  maintenanceStatusRepository = {
    findByName: vi.fn().mockResolvedValue(fakeStatus)
  };
  maintenanceRequestStatusRepository = {
    save: vi.fn().mockResolvedValue(fakeRequestStatus)
  };

  service = new MaintenanceRequestStatusService(
    maintenanceRequestRepository as MaintenanceRequestRepository,
    userRepository as UserRepository,
    maintenanceStatusRepository as MaintenanceStatusRepository
  );

  // Manually inject the missing repository since it's not in the constructor
  (service as any).maintenanceRequestStatusRepository = maintenanceRequestStatusRepository;
});

describe("createMaintenanceRequestStatus", () => {
  it("throws if maintenance_request_id is missing", async () => {
    await expect(service.createMaintenanceRequestStatus("", "user1", MaintenanceStatusType.NEW))
      .rejects.toThrow("Maintenance Request ID is required");
  });

  it("throws if user_operator_id is missing", async () => {
    await expect(service.createMaintenanceRequestStatus("1", "", MaintenanceStatusType.NEW))
      .rejects.toThrow("Maintenance Operator ID is required");
  });

  it("throws if status is missing", async () => {
    await expect(service.createMaintenanceRequestStatus("1", "user1", "" as any))
      .rejects.toThrow("Maintenance Status is required");
  });

  it("throws if maintenance request doesn't exist", async () => {
    (maintenanceRequestRepository.findOne as any).mockResolvedValueOnce(null);
    await expect(service.createMaintenanceRequestStatus("1", "user1", MaintenanceStatusType.NEW))
      .rejects.toThrow("Maintenance Request does not exist");
  });

  it("throws if user doesn't exist", async () => {
    (userRepository.findOne as any).mockResolvedValueOnce(null);
    await expect(service.createMaintenanceRequestStatus("1", "user1", MaintenanceStatusType.NEW))
      .rejects.toThrow("Maintenance Operator does not exist");
  });

  it("creates status when valid", async () => {
    const result = await service.createMaintenanceRequestStatus("1", "user1", MaintenanceStatusType.NEW);
    expect(result).toEqual(fakeRequestStatus);
    expect(maintenanceRequestStatusRepository.save).toHaveBeenCalledWith({
      maintenanceRequestId: "1",
      userOperatorId: "user1",
      status: fakeStatus
    });
  });
});

describe("startWorkOnTask", () => {
    it("calls createMaintenanceRequestStatus with UPDATE", async () => {
      const spy = vi
        .spyOn(service, "createMaintenanceRequestStatus")
        .mockResolvedValue(fakeRequestStatus);
      const result = await service.startWorkOnTask("1", "user1");
      expect(spy).toHaveBeenCalledWith("1", "user1", MaintenanceStatusType.UPDATE);
      expect(result).toEqual(fakeRequestStatus);
    });
  });
  
describe("unAssignTask", () => {
    it("calls createMaintenanceRequestStatus with UNASSIGNED", async () => {
      const spy = vi
        .spyOn(service, "createMaintenanceRequestStatus")
        .mockResolvedValue(fakeRequestStatus);
      const result = await service.unAssignTask("1", "user1");
      expect(spy).toHaveBeenCalledWith("1", "user1", MaintenanceStatusType.UNASSIGNED);
      expect(result).toEqual(fakeRequestStatus);
    });
  });
  
describe("completeTask", () => {
    it("calls createMaintenanceRequestStatus with COMPLETED", async () => {
      const spy = vi
        .spyOn(service, "createMaintenanceRequestStatus")
        .mockResolvedValue(fakeRequestStatus);
      const result = await service.completeTask("1", "user1");
      expect(spy).toHaveBeenCalledWith("1", "user1", MaintenanceStatusType.COMPLETED);
      expect(result).toEqual(fakeRequestStatus);
    });
  });