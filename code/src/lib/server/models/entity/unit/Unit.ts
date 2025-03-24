import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IProperty } from "../property/IProperty";
import type { IUnit } from "./IUnit";
import { Property } from "../property/Property";

@Entity()
export class Unit extends BaseEntity implements IUnit
{
    constructor(number: number, property: IProperty)
    {
        super();
        this.number = number;
        this.property = property;
    }

    @Column({type: 'int'})
    number: number;

    @Column({type: 'uuid'})
    @ManyToOne(()=> Property, (property)=> property.id)
    property: Property;

}