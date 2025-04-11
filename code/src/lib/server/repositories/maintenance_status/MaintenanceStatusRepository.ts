import type { IMaintenanceStatus } from "$lib/server/models/entity/maintenance_status/IMaintenanceStatus";
import { MaintenanceStatus, MaintenanceStatusType } from "$lib/server/models/entity/maintenance_status/MaintenanceStatus";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceStatusRepository extends Repository<IMaintenanceStatus> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceStatus, queryRunner.manager)
    }

    async findByName(maintenanceStatus: MaintenanceStatusType): Promise<IMaintenanceStatus> {
        const res = await this.findOne({where: { name: maintenanceStatus}});

        if(!res)
            throw new Error(`Maintenance Status with name ${maintenanceStatus} is not found`);

        return res;
    }
}