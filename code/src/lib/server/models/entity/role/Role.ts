import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IRole } from "./IRole";

export enum RoleType
{
    OWNER = "owner",
    TENANT = "tenant",
    MAINTENANCE_MANAGER="maintenance manager",
    MAINTENANCE_OPERATOR="maintenance operator"

}

@Entity()
export class Role extends BaseEntity implements IRole
{
    @Column({
        type:"enum",
        enum:RoleType,
        unique:true
    })
    name:RoleType
}