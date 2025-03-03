import { Column, Entity } from "typeorm";
import type { IUser } from "./IUser";
import { BaseEntity } from "../common/BaseEntity";

@Entity()
export class User extends BaseEntity implements IUser {

    //the usernames are unique
    @Column({type: 'varchar',unique: true})
    username: string;

    @Column({type: 'varchar'})
    password: string;
}