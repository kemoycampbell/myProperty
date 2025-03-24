import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import { User } from "../User/User";
import type { IProperty } from "./IProperty";

@Entity()
export class Property  extends BaseEntity implements IProperty {

    //this should refer to the user id in the user table using a one to one relationship
    @Column({type: 'varchar'})
    @ManyToOne(()=>User, (user)=> user.id)
    @JoinColumn()
    owner: User;

    @Column({type: 'varchar'})
    address_line1: string;

    @Column({type: 'varchar', nullable: true})
    address_line2: string;

    @Column({type: 'varchar', length: 50})
    city: string;

    @Column({type: 'varchar', length: 2})
    state: string;

    @Column({type: 'varchar', length: 5})
    zip: string;

    @Column({type: 'varchar'})
    name: string;

}