import { UserException } from "../exceptions/UserException";
import type { IMaintenanceRequestStatus } from "../models/entity/maintenance_request_status/IMaintenanceRequestStatus";
import { MaintenanceStatus, MaintenanceStatusType } from "../models/entity/maintenance_status/MaintenanceStatus";
import type { MaintenanceRequestRepository } from "../repositories/maintenance_request/maintenanceRequestRepository";
import type { MaintenanceRequestStatusRepository } from "../repositories/maintenance_request_status/maintenanceRequestStatusRepository";
import type { MaintenanceStatusRepository } from "../repositories/maintenance_status/MaintenanceStatusRepository";
import type { UserRepository } from "../repositories/user/UserRepository";

export class MaintenanceRequestStatusService {
    private maintenanceRequestRepository: MaintenanceRequestRepository;
    private userRepository: UserRepository;
    private maintenanceRequestStatusRepository: MaintenanceRequestStatusRepository;
    private maintenanceStatusRepository: MaintenanceStatusRepository;

    constructor(maintenanceRequestRepository: MaintenanceRequestRepository, userRepository: UserRepository, maintenanceStatusRepository: MaintenanceStatusRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.userRepository = userRepository;
        this.maintenanceStatusRepository = maintenanceStatusRepository;
    }

    /**
     * Create a Maintenance Request Status
     * @param maintenance_request_id
     * @param user_operator_id
     * @param status
     */
    async createMaintenanceRequestStatus(maintenance_request_id: string, user_operator_id: string, status: MaintenanceStatusType): Promise<IMaintenanceRequestStatus> {
        if(!maintenance_request_id)
            throw new UserException("Maintenance Request ID is required", 400)

        if(!user_operator_id)
            throw new UserException("Maintenance Operator ID is required", 400)

        if(!status)
            throw new UserException("Maintenance Status is required", 400)

        const maintenanceRequest = await this.maintenanceRequestRepository.findOne({where: {id: maintenance_request_id}});
        const maintenanceOperator = await this.userRepository.findOne({where: {id: user_operator_id}});
        const maintenanceStatus = await this.maintenanceStatusRepository.findByName(status);

        if(!maintenanceRequest)
            throw new UserException("Maintenance Request does not exist", 400);

        if(!maintenanceOperator)
            throw new UserException("Maintenance Operator does not exist", 400);

        // Create the Maintenance Request Status
        const request:Partial<IMaintenanceRequestStatus> = {
            maintenanceRequestId: maintenance_request_id,
            userOperatorId: user_operator_id,
            status: maintenanceStatus
        }

        const res = await this.maintenanceRequestStatusRepository.save(request);

        return res;
    }

    async startWorkOnTask(maintenance_request_id: string, user_operator_id: string): Promise<IMaintenanceRequestStatus> {
        const in_progress = MaintenanceStatusType.UPDATE;   
        
        return this.createMaintenanceRequestStatus(maintenance_request_id, user_operator_id, in_progress);
    }

    async unAssignTask(maintenance_request_id: string, user_operator_id: string): Promise<IMaintenanceRequestStatus> {
        const unassigned_progress = MaintenanceStatusType.UNASSIGNED;

        return this.createMaintenanceRequestStatus(maintenance_request_id, user_operator_id, unassigned_progress);
    }

    async completeTask(maintenance_request_id: string, user_operator_id: string): Promise<IMaintenanceRequestStatus> {
        const completed_progress = MaintenanceStatusType.COMPLETED;

        return this.createMaintenanceRequestStatus(maintenance_request_id, user_operator_id, completed_progress);
    }
}