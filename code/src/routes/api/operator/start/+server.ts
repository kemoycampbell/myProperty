import database from "$lib/server/database/database";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { MaintenanceStatusRepository } from "$lib/server/repositories/maintenance_status/MaintenanceStatusRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestService } from "$lib/server/services/maintenanceRequestService";
import { MaintenanceRequestStatusService } from "$lib/server/services/maintenanceRequestStatusService";
import { processAPIRequest } from "$middleware/apiResponse";


const runner = database.createQueryRunner();
const maintenanceStatusRepository = new MaintenanceStatusRepository(runner);
const userRepository = new UserRepository(runner)
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);

const maintenanceRequestStatusService = new MaintenanceRequestStatusService(maintenanceRequestRepository,
    userRepository, maintenanceStatusRepository
)

export const POST = processAPIRequest(async ({request }) => {

    const data = await request.json();

    const res = await maintenanceRequestStatusService.startWorkOnTask(
        data.maintenance_request_id, data.user_operator_id);
    return {
        status: 200,
        body: {
            res
        }
    }
});