import { UserException } from "../exceptions/UserException";
import type { IMaintenanceRequest } from "../models/entity/maintenance_request/IMaintenanceRequest";
import { MaintenanceRequestRepository } from "../repositories/maintenance_request/maintenanceRequestRepository";
import type { UnitRepository } from "../repositories/unit/unitRepository";
import type { UserRepository } from "../repositories/user/UserRepository";

export class MaintenanceRequestService {
    private maintenanceRequestRepository: MaintenanceRequestRepository;
    private userRepository: UserRepository;
    private unitRepository: UnitRepository;

    constructor(maintenanceRequestRepository: MaintenanceRequestRepository, userRepository: UserRepository, unitRepository: UnitRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.userRepository = userRepository;
        this.unitRepository = unitRepository;
    }

    /**
     * Create a Maintenance Request
     * @param user_requested_id
     * @param unit_id
     * @param description
     */
    async createMaintenanceRequest(user_requested_id: string, unit_id: string, description: string): Promise<IMaintenanceRequest> {
        if(!user_requested_id)
            throw new UserException("Requested User ID is required", 400)

        const user = await this.userRepository.findOne({where: {id: user_requested_id}});

        if(!user)
            throw new UserException("Requested User ID is not found", 400)

        if(!unit_id)
            throw new UserException("Unit ID is required", 400)

        const unit = await this.unitRepository.findOne({where: {id: unit_id}});

        if(!unit)
            throw new UserException("Unit ID is not found", 400)

        if(!description)
            throw new UserException("Maintenance Request Description is required", 400)

        //  create the maintenance request in form of entity
        const request: Partial<IMaintenanceRequest> = {
            userRequestedId: user_requested_id,
            unitId: unit_id,
            description: description
        }

        //  pass the entity to the repository   
        const res = await this.maintenanceRequestRepository.save(request);

        return res;
    }
};