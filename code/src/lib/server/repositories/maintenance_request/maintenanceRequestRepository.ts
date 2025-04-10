import type { IMaintenanceRequest } from "$lib/server/models/entity/maintenance_request/IMaintenanceRequest";
import { MaintenanceRequest } from "$lib/server/models/entity/maintenance_request/MaintenanceRequest";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceRequestRepository extends Repository<IMaintenanceRequest> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceRequest, queryRunner.manager);
    }
}