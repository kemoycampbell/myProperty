import type { IEntity } from "../common/IEntity";
import type { IProperty } from "../property/IProperty";
import type { Property } from "../property/Property";

export interface IUnit extends IEntity {
    number: number,
    property: IProperty


}