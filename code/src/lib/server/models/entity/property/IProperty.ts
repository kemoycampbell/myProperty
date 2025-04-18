import type { IEntity } from "../common/IEntity";
import type { IUser } from "../User/IUser";

export interface IProperty extends IEntity{
    name:string;
    owner:IUser;
    address_line1:string;
    address_line2:string;
    city:string;
    state:string;
    zip:string;

}