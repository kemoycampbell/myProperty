import { UserException } from "$lib/server/exceptions/UserException";
import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import type { IMaintenanceRequestPhoto } from "$lib/server/models/entity/maintenance_request_photo/IMaintenanceRequestPhoto";
import { Role, RoleType } from "$lib/server/models/entity/role/Role";
import type { IUser } from "$lib/server/models/entity/User/IUser";
import type { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import type { MaintenanceRequestPhotoRepository } from "$lib/server/repositories/maintenance_request_photo/maintenanceRequestPhotoRepository";
import type { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestPhotoService } from "$lib/server/services/maintenanceRequestPhotoService";
import { Mock,vi, describe, expect, it, beforeEach } from "vitest";

describe("MaintenanceRequestPhotoService Tests", () => {
    let maintenanceRequestPhotoRepository: Partial<MaintenanceRequestPhotoRepository>;
    let maintenanceRequestRepository: Partial<MaintenanceRequestRepository>;
    let userRepository: Partial<UserRepository>;

    let service: MaintenanceRequestPhotoService;

    let fakeUser: IUser;
    let fakeMaintenanceRequestPhoto:IMaintenanceRequestPhoto;
    let fakeMaintenanceRequest:IMaintenanceRequest;

    beforeEach(() => {

        //fake datas
        const role = new Role();
        role.name = RoleType.MAINTENANCE_MANAGER;

        fakeUser = {
            id: "123",
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            email:'johndoe@johnnyserver.com',
            password: "password",
            role: role,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        fakeMaintenanceRequest = {
            id: "123",
            unitId: "123",
            userRequestedId: "123",
            description: "Description",
            createdAt: new Date(),
            updatedAt: new Date(),

        }

        fakeMaintenanceRequestPhoto = {
            id: "123",
            maintenanceRequestID: "123",
            maintenanceRequestStatusID: "123",
            userUploadedId: "123",
            url: "http://example.com/photo.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        maintenanceRequestPhotoRepository = {
            save: vi.fn().mockResolvedValue(fakeMaintenanceRequestPhoto)
        };

        maintenanceRequestRepository = {
            findOne: vi.fn().mockReturnValue(fakeMaintenanceRequest)
        };

        userRepository = {
            findOne: vi.fn().mockResolvedValue(fakeUser)
        } ;

        service = new MaintenanceRequestPhotoService(
            maintenanceRequestPhotoRepository as MaintenanceRequestPhotoRepository,
            maintenanceRequestRepository as MaintenanceRequestRepository,
            userRepository as UserRepository
        );

    });

    it('should throw a user exception if maintenance_request_id is not provided', async () => {

        //fake datas
        const maintenanceId = "";
        const maintenanceRequestStatusId = "123";
        const userId = "123";
        const url = "http://example.com/photo.jpg";

        //create promise without await
        const create = service.createMaintenanceRequestPhoto(maintenanceId, maintenanceRequestStatusId, userId, url);

        //check if exception was thrown
        await expect(create).rejects.toThrowError(new UserException("Maintenance Request ID is required", 400));
    });

    it('should throw a user exception if maintenance_request_status_id is not provided', async () => {
        //fake datas
        const maintenanceId = "123";
        const maintenanceRequestStatusId = "";
        const userId = "123";
        const url = "http://example.com/photo.jpg";

        //create promise without await
        const create = service.createMaintenanceRequestPhoto(maintenanceId, maintenanceRequestStatusId, userId, url);

        //check if exception was thrown
        await expect(create).rejects.toThrowError(new UserException("Maintenance Request Status ID is required", 400));
    });

    it('should throw a user exception if user_uploaded_id is not provided', async () => {
        //fake datas
        const maintenanceId = "123";
        const maintenanceRequestStatusId = "123";
        const userId = "";
        const url = "http://example.com/photo.jpg";

        //create promise without await
        const create = service.createMaintenanceRequestPhoto(maintenanceId, maintenanceRequestStatusId, userId, url);

        //check if exception was thrown
        await expect(create).rejects.toThrowError(new UserException("User ID is required", 400));
    });

    it('should throw a user exception if url is not provided', async () => {
        //fake datas
        const maintenanceId = "123";
        const maintenanceRequestStatusId = "123";
        const userId = "123";
        const url = "";

        //create promise without await
        const create = service.createMaintenanceRequestPhoto(maintenanceId, maintenanceRequestStatusId, userId, url);

        //check if exception was thrown
        await expect(create).rejects.toThrowError(new UserException("URL is required", 400));
    });

    it('should create a maintenance request photo', async () => {
        //fake datas
        const maintenanceId = fakeMaintenanceRequestPhoto.maintenanceRequestID;
        const maintenanceRequestStatusId = fakeMaintenanceRequestPhoto.maintenanceRequestStatusID
        const userId = fakeMaintenanceRequestPhoto.userUploadedId;
        const url = fakeMaintenanceRequestPhoto.url;

        //create promise without await
        const create = await service.createMaintenanceRequestPhoto(maintenanceId, maintenanceRequestStatusId, userId, url);

        //check if exception was thrown
        expect(create).toBeDefined();
        expect(create).toEqual(fakeMaintenanceRequestPhoto);
    });

});