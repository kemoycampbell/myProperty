import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceStatus } from "./IMaintenanceStatus";


export enum MaintenanceStatusType {
    NEW = "new",
    UPDATE = "update",
    COMPLETED = "completed"
}

@Entity()
export class MaintenanceStatus extends BaseEntity implements IMaintenanceStatus {
    @Column({
        type:"enum",
        enum:MaintenanceStatusType,
        unique:true
    })

    name:MaintenanceStatusType
}