import type { IEntity } from "../common/IEntity";

export interface IMaintenanceRequest extends IEntity {
    userRequestedId:string;
    unitId:string;
    description:string;
};