import type { IEntity } from "../common/IEntity";
import type { IUser } from "../User/IUser";

export interface IMaintenanceRequest extends IEntity {
    userRequestedId:string;
    unitId:string;
    description:string;
    user:IUser;
};