import type { IEntity } from "../common/IEntity";
import type { IProperty } from "../property/IProperty";


export interface IUnit extends IEntity {
    number: number,
    property: IProperty


}