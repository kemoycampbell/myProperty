import type { IMaintenanceRequestPhoto } from "$lib/server/models/entity/maintenance_request_photo/IMaintenanceRequestPhoto";
import { MaintenanceRequestPhoto } from "$lib/server/models/entity/maintenance_request_photo/MaintenanceRequestPhoto";
import { Repository, type QueryRunner } from "typeorm";

export class MaintenanceRequestPhotoRepository extends Repository<IMaintenanceRequestPhoto> {
    constructor(queryRunner: QueryRunner) {
        super(MaintenanceRequestPhoto, queryRunner.manager)
    }
}