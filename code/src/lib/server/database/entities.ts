import { Document } from "../models/entity/document/Document";
import { DocType, DocumentType } from "../models/entity/document_type/DocType";
import { MaintenanceRequest } from "../models/entity/maintenance_request/MaintenanceRequest";
import { MaintenanceRequestPhoto } from "../models/entity/maintenance_request_photo/MaintenanceRequestPhoto";
import { MaintenanceRequestStatus } from "../models/entity/maintenance_request_status/MaintenanceRequestStatus";
import { MaintenanceStatus } from "../models/entity/maintenance_status/MaintenanceStatus";
import { Property } from "../models/entity/property/Property";
import { Role } from "../models/entity/role/Role";
import { Tenant } from "../models/entity/Tenant/Tenant";
import { Unit } from "../models/entity/unit/Unit";
import { User } from "../models/entity/User/User";


export const ENTITIES = [
    User,
    Role,
    Property,
    Unit,
    Tenant,
    Property,
    MaintenanceRequest,
    MaintenanceRequestPhoto,
    MaintenanceStatus,
    MaintenanceRequestStatus,
    DocType,
    Document
]