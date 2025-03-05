import { Column, OneToMany } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IRole } from "./IRole";
import { User } from "../User/User";

export enum RoleType
{
    OWNER = "owner",
    TENANT = "tenant",
    MAINTENANCE_MANAGER="maintenance manager",
    MAINTENANCE_OPERATOR="maintenance operator"

}
export class Role extends BaseEntity implements IRole
{
    @Column({
        type:"enum",
        enum:RoleType,
        unique:true
    })
    name:RoleType

    @OneToMany(()=>User, (user)=> user.role)
    users:User[];

}