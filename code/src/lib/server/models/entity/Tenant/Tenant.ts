import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IProperty } from "../property/IProperty";
import type { ITenant } from "./ITenant";
import { Property } from "../property/Property";
import { User } from "../User/User";
import { Unit } from "../unit/Unit";

@Entity()
export class Tenant extends BaseEntity implements ITenant {
    
    // a column that refers to the fk of the user id
    @Column({type: 'uuid'})
    @ManyToOne(()=> Property, (property)=> property.id)
    property: IProperty

    @Column({type: 'uuid'})
    @ManyToOne(()=> User, (user)=> user.id)
    @JoinColumn()
    tenant: User

    @Column({type: 'timestamp', name: 'start_date'})
    startDate: Date;

    @Column({type: 'timestamp', name: 'end_date'})
    endDate: Date;

    @Column({type: 'uuid'})
    @ManyToOne(()=> Unit, (unit)=> unit.id)
    @JoinColumn()
    unit: Unit

}