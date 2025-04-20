import type { IEntity } from "../common/IEntity";

export interface IEmergencyContact extends IEntity {
    userTenantID:string;
    firstName:string,
    lastName:string,
    email:string,
    phone:string
};