import type { IMaintenanceRequestStatus } from "$lib/server/models/entity/maintenance_request_status/IMaintenanceRequestStatus";
import { MaintenanceRequestStatus } from "$lib/server/models/entity/maintenance_request_status/MaintenanceRequestStatus";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceRequestStatusRepository extends Repository<IMaintenanceRequestStatus> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceRequestStatus, queryRunner.manager);
    }
}