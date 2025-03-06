import type { IEntity } from "../common/IEntity";
import type { Role } from "../role/Role";


export interface IUser extends IEntity {
    username: string;
    password: string;
    role:Role;
}