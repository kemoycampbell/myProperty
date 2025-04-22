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
import { json } from "@sveltejs/kit";
import { DocType, DocumentType } from "$lib/server/models/entity/document_type/DocType";
import { UserException } from "$lib/server/exceptions/UserException";
import { DocumentTypeRepository } from "$lib/server/repositories/document/documentTypeRepository";

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
const documentTypeRepository = new DocumentTypeRepository(runner);

export const GET = processAPIRequest(async ({ params }) => {
    const { id } = params;
    const documents = await documentService.getDocumentsByOwnerId(id);
    return json({
        status: 200,
        body: {
            documents
        }
    });
});

export const POST = processAPIRequest(async ({ request, params }) => {
    const { id } = params;
    const data = await request.json();

    //use the runner to get the doctype

    const docTypeToEnum = Object.values(DocumentType).includes(data.docType)
  ? data.docType as DocumentType
  : undefined;

  if(!docTypeToEnum) {
    throw new UserException("Invalid document type");}



    const docType = await documentTypeRepository.findByName(docTypeToEnum);
    if(!docType) {
        throw new UserException("Document type not found");
    }

    console.log("DocType: ", docType);

    // const docType:DocType = new DocType();
    // docType.name = data.docType;
    // console.log("DocType: ", docType);
    


    const document = await documentService.createDocument(id, data.tenantId, data.unitId, data.file, docType);
    return json({
        status: 200,
        body: {
            document
        }
    });
});

