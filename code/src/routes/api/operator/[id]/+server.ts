import database from "$lib/server/database/database";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestService } from "$lib/server/services/maintenanceRequestService";
import { processAPIRequest } from "$middleware/apiResponse";


const runner = database.createQueryRunner();
const unitRepository = new UnitRepository(runner);
const userRepository = new UserRepository(runner)
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);

const maintenanceRequestService = new MaintenanceRequestService
(
    maintenanceRequestRepository,
    userRepository,
    unitRepository

)

export const GET = processAPIRequest(async ({ params }) => {
    const { id } = params;
    const res = await maintenanceRequestService.getMaintenanceRequestByOperatorId(id);
    return {
        status: 200,
        body: {
            res
        }
    }
});