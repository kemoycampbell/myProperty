import type { IEntity } from "../common/IEntity";
import type { RoleType } from "./Role";

export interface IRole extends IEntity{
    name:RoleType
}