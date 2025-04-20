import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import { MaintenanceRequest } from "$lib/server/models/entity/maintenance_request/MaintenanceRequest";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceRequestRepository extends Repository<IMaintenanceRequest> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceRequest, queryRunner.manager);
    }

    async getAllMaintenanceRequestByOperatorId(operatorId: string): Promise<IMaintenanceRequest[]> {
        const requests = await this
        .createQueryBuilder("request")
        .innerJoin("maintenance_request_status", "status", "status.maintenance_request_id = request.id")
        .addSelect("status.operator_id", "status_operator_id")
        .where("status.operator_id = :operatorId", { operatorId })
        .getRawMany();
        return requests;
    }
}