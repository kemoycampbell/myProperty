import database from "$lib/server/database/database";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestService } from "$lib/server/services/maintenanceRequestService";
import { json } from "@sveltejs/kit";
import { processAPIRequest } from "../../../middleware/apiResponse";

const runner = database.createQueryRunner();
const userRepository = new UserRepository(runner);
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);
const unitRepository = new UnitRepository(runner);
const service = new MaintenanceRequestService(maintenanceRequestRepository,
    userRepository, unitRepository);

export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    console.log(data);
    const res = await service.createMaintenanceRequest(
        data.userRequestId,
        data.unitId, 
        data.description
    );
    
    return json({status:200, maintainRequest: res})
});