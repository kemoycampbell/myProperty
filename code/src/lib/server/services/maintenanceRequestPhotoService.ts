import { UserException } from "../exceptions/UserException";
import type { IMaintenanceRequestPhoto } from "../models/entity/maintenance_request_photo/IMaintenanceRequestPhoto";
import type { MaintenanceRequestRepository } from "../repositories/maintenance_request/maintenanceRequestRepository";
import type { MaintenanceRequestPhotoRepository } from "../repositories/maintenance_request_photo/maintenanceRequestPhotoRepository";
import type { UserRepository } from "../repositories/user/UserRepository";
import type { DocumentService } from "./documentService";

export class MaintenanceRequestPhotoService {
    private maintenanceRequestPhotoRepository: MaintenanceRequestPhotoRepository;
    private maintenanceRequestRepository: MaintenanceRequestRepository;
    private userRepository: UserRepository;
    private documentService: DocumentService;

    constructor(
        maintenanceRequestPhotoRepository: MaintenanceRequestPhotoRepository, 
        maintenanceRequestRepository: MaintenanceRequestRepository, 
        userRepository: UserRepository, 
        documentService: DocumentService
    ) {
        this.maintenanceRequestPhotoRepository = maintenanceRequestPhotoRepository;
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.userRepository = userRepository;
        this.documentService = documentService;
    }

    /**
     * Create a Maintenanace Request Photo
     * @param maintenance_request_id
     * @param maintenance_request_status_id
     * @param user_uploaded_id
     * @param url
     */
    async createMaintenanceRequestPhoto(maintenance_request_id: string, maintenance_request_status_id: string, user_uploaded_id: string, url: string): Promise<IMaintenanceRequestPhoto> {
        if(!maintenance_request_id)
            throw new UserException("Maintenance Request ID is required", 400)

        if(!maintenance_request_status_id)
            throw new UserException("Maintenance Request Status ID is required", 400)

        if(!user_uploaded_id)
            throw new UserException("User ID is required", 400)

        if(!url)
            throw new UserException("URL is required", 400)

        const maintenanceRequest = await this.maintenanceRequestRepository.findOne({where: {id: maintenance_request_id}});
        // const maintenanceRequestStatus = await this.maintenanceRequestStatus.findOne({where: {id: maintenance_request_status_id}});
        const user = await this.userRepository.findOne({where: {id: user_uploaded_id}});

        // Create
        const request: Partial<IMaintenanceRequestPhoto> = {
            maintenanceRequestID: maintenance_request_id,
            maintenanceRequestStatusID: maintenance_request_status_id,
            userUploadedId: user_uploaded_id,
            url: url
        }
        
        const res = await this.maintenanceRequestPhotoRepository.save(request);

        return res;
    }

    async uploadPhoto(maintenance_request_id: string, maintenance_request_status_id: string, user_uploaded_id: string, base64File: string): Promise<IMaintenanceRequestPhoto> {
        let url: string = await this.documentService.upload(base64File);

        return this.createMaintenanceRequestPhoto(
            maintenance_request_id,
            maintenance_request_status_id,
            user_uploaded_id,
            url
        );
    }
}