import type { IEntity } from "../common/IEntity";
import type { IProperty } from "../property/IProperty";
import type { IUnit } from "../unit/IUnit";
import type { IUser } from "../User/IUser";

export interface ITenant extends IEntity {
    property: IProperty
    tenant: IUser
    startDate: Date
    endDate: Date
    unit: IUnit
}