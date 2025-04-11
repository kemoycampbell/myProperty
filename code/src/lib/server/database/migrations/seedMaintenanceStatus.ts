import { MaintenanceStatus, MaintenanceStatusType } from "$lib/server/models/entity/maintenance_status/MaintenanceStatus";
import type { DataSource } from "typeorm";

/**
 * This is a function that seeds the roles in the database
 * @param source 
 */
const seedMaintenanceStatus = async(source: DataSource) => {
    const repository = source.getRepository(MaintenanceStatus);
    const maintenanceStatuses = Object.values(MaintenanceStatusType).map((maintenanceStatus) => ({ name: maintenanceStatus }));

    await repository
    .createQueryBuilder()
    .insert()
    .into(MaintenanceStatus)
    .values(maintenanceStatuses)
    .orIgnore()
    .execute();
};

export default seedMaintenanceStatus;