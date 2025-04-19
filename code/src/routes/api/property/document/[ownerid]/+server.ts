import { DocumentRepository } from "../../../../../lib/server/repositories/document/DocumentRepository";
import { DocumentService } from "../../../../../lib/server/services/documentService";
import { UnitService } from "../../../../../lib/server/services/unitService";
import { UserService } from "../../../../../lib/server/services/userService";
import database from "$lib/server/database/database";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { PropertyService } from "$lib/server/services/propertyService";
import { PropertyRepository } from "$lib/server/repositories/property/propertyRepository";
import { processAPIRequest } from "$middleware/apiResponse";

const runner = database.createQueryRunner();

const userRepository = new UserRepository(runner);
const roleRepository = new RoleRepository(runner);

const documentRepository = new DocumentRepository(runner);
const userService = new UserService(userRepository, roleRepository);

const unitRepository = new UnitRepository(runner);
const propertyRepository = new PropertyRepository(runner);
const propertyService = new PropertyService(propertyRepository);

const unitService = new UnitService(unitRepository, propertyService);


const documentService = new DocumentService(documentRepository, userService, unitService);

export const GET = processAPIRequest(async ({ params }) => {
    const { ownerid } = params;
    const documents = await documentService.getDocumentsByOwnerId(ownerid);
    return {
        status: 200,
        body: {
            documents
        }
    };
});

export const POST = processAPIRequest(async ({ request, params }) => {
    const { ownerid } = params;
    const data = await request.json();


    const document = await documentService.createDocument(ownerid, data.tenantId, data.unitId, data.file);
    return {
        status: 200,
        body: {
            document
        }
    };
});

