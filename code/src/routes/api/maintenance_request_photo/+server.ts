import database from "$lib/server/database/database";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { MaintenanceRequestPhotoRepository } from "$lib/server/repositories/maintenance_request_photo/maintenanceRequestPhotoRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { MaintenanceRequestPhotoService } from "$lib/server/services/maintenanceRequestPhotoService";
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";

const runner = database.createQueryRunner();
const maintenanceRequestPhotoRepository = new MaintenanceRequestPhotoRepository(runner);
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);
const userRepository = new UserRepository(runner);
const service = new MaintenanceRequestPhotoService(
    maintenanceRequestPhotoRepository,
    maintenanceRequestRepository,
    userRepository
);

export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();

    const res = await service.createMaintenanceRequestPhoto(
        data.maintenance_request_id,
        data.maintenance_request_status_id,
        data.user_uploaded_id,
        data.url
    );

    return json({
        status: 200,
        maintenanceRequestPhotoRequest: res
    });
});