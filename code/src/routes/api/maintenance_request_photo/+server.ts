import database from "$lib/server/database/database";
import { DocumentRepository } from "$lib/server/repositories/document/DocumentRepository";
import { MaintenanceRequestRepository } from "$lib/server/repositories/maintenance_request/maintenanceRequestRepository";
import { MaintenanceRequestPhotoRepository } from "$lib/server/repositories/maintenance_request_photo/maintenanceRequestPhotoRepository";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { DocumentService } from "$lib/server/services/documentService";
import { MaintenanceRequestPhotoService } from "$lib/server/services/maintenanceRequestPhotoService";
import { PropertyService } from "$lib/server/services/propertyService";
import { UnitService } from "$lib/server/services/unitService";
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";

const runner = database.createQueryRunner();
const maintenanceRequestPhotoRepository = new MaintenanceRequestPhotoRepository(runner);
const maintenanceRequestRepository = new MaintenanceRequestRepository(runner);

const roleRepository = new RoleRepository(runner);
const userRepository = new UserRepository(runner);
const userService = new UserService(userRepository, roleRepository);

const propertyRepository = new PropertyRepository(runner);
const propertyService = new PropertyService(propertyRepository);

const unitRepository = new UnitRepository(runner);
const unitService = new UnitService(unitRepository, propertyService);

const documentRepository = new DocumentRepository(runner);
const documentService = new DocumentService(documentRepository,userService, unitService);

const service = new MaintenanceRequestPhotoService(
    maintenanceRequestPhotoRepository,
    maintenanceRequestRepository,
    userRepository,
    documentService
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