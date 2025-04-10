import type { IEntity } from "../common/IEntity";

export interface IMaintenanceRequestPhoto extends IEntity {
    maintenanceRequestID:string;
    maintenanceRequestStatusID:string;
    userUploadedId:string;
    url:string;
}