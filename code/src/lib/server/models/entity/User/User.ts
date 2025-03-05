import { Column, Entity, ManyToOne } from "typeorm";
import type { IUser } from "./IUser";
import { BaseEntity } from "../common/BaseEntity";
import { Role } from "../role/Role";

@Entity()
export class User extends BaseEntity implements IUser {

    //the usernames are unique
    @Column({type: 'varchar',unique: true})
    username: string;

    @Column({type: 'varchar'})
    password: string;

    @ManyToOne(()=> Role, (role)=> role.users)
    role: Role
}