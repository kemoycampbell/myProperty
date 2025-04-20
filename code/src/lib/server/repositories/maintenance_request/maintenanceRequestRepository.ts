import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import { MaintenanceRequest } from "$lib/server/models/entity/maintenance_request/MaintenanceRequest";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceRequestRepository extends Repository<IMaintenanceRequest> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceRequest, queryRunner.manager);
    }

    async getAllMaintenanceRequestByOperatorId(operatorId: string): Promise<IMaintenanceRequest[]> {
        console.log("Operator ID:", operatorId); // Debugging
    
        const requests = await this
            .createQueryBuilder("request")
            .innerJoin(
                "maintenance_request_status",
                "status",
                "status.maintenance_request_id = request.id::text" // Casting explícito aquí
            )
            .addSelect("status.userOperatorId", "status_userOperatorId") // Usar el nombre correcto
            .where("status.user_operator_id = :operatorId", { operatorId }) // No es necesario CAST aquí
            .getRawMany();
    
        return requests;
    }
}