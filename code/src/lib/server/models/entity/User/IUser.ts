import type { IEntity } from "../common/IEntity";


export interface IUser extends IEntity {
    username: string;
    password: string;
}