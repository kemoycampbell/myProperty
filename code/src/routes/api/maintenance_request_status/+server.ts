import database from "$lib/server/database/database";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { MaintenanceStatusRepository } from "$lib/server/repositories/maintenance_status/MaintenanceStatusRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestStatusService } from "$lib/server/services/maintenanceRequestStatusService";
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";

const runner = database.createQueryRunner();
const userRepository = new UserRepository(runner);
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);
const maintenanceStatusRepository = new MaintenanceStatusRepository(runner);
const service = new MaintenanceRequestStatusService(
    maintenanceRequestRepository,
    userRepository,
    maintenanceStatusRepository
);

export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();

    const res = await service.createMaintenanceRequestStatus(
        data.maintenance_request_id,
        data.user_operator_id,
        data.status
    );

    return json({
        status: 200,
        maintainanceStatusRequest: res
    });
});