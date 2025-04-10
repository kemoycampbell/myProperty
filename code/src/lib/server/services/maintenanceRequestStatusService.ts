import { UserException } from "../exceptions/UserException";
import type { IMaintenanceRequestStatus } from "../models/entity/maintenance_request_status/IMaintenanceRequestStatus";
import type { MaintenanceRequestRepository } from "../repositories/maintenance_request/maintenanceRequestRepository";
import type { UserRepository } from "../repositories/user/UserRepository";

export class MaintenanceRequestStatusService {
    private maintenanceRequestRepository: MaintenanceRequestRepository;
    private userRepository: UserRepository;
    maintenanceRequestStatusRepository: any;

    constructor(maintenanceRequestRepository: MaintenanceRequestRepository, userRepository: UserRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create a Maintenance Request Status
     * @param maintenance_request_id
     * @param user_operator_id
     * @param status
     */
    async createMaintenanceRequestStatus(maintenance_request_id: string, user_operator_id: string, status: string): Promise<IMaintenanceRequestStatus> {
        if(!maintenance_request_id)
            throw new UserException("Maintenance Request ID is required", 400)

        if(!user_operator_id)
            throw new UserException("Maintenance Operator ID is required", 400)

        if(!status)
            throw new UserException("Status is required", 400)

        const maintenanceRequest = await this.maintenanceRequestRepository.findOne({where: {id: maintenance_request_id}});
        const maintenanceOperator = await this.userRepository.findOne({where: {id: user_operator_id}});

        // Create the Maintenance Request Status
        const request: Partial<IMaintenanceRequestStatus> = {
            maintenanceRequestId: maintenance_request_id,
            userOperatorId: user_operator_id,
            status: status
        }

        const res = await this.maintenanceRequestStatusRepository.save(request);

        return res;
    }
}