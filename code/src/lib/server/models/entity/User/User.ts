import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import type { IUser } from "./IUser";
import { BaseEntity } from "../common/BaseEntity";
import { Role } from "../role/Role";

@Entity()
export class User extends BaseEntity implements IUser {

    @Column({type: 'varchar', length: 50, name: 'first_name'})

    firstName: string;
    @Column({type: 'varchar', length: 50, name: 'last_name'})
    lastName: string;
    //the usernames are unique
    @Column({type: 'varchar',unique: true})
    username: string;

    @Column({type: 'varchar',unique: true})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @ManyToOne(()=> Role, (role)=> role.id)
    @JoinColumn({
        name: 'role_id'  
    })
    role: Role
}