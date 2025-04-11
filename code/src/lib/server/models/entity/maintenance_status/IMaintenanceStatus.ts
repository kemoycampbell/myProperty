import type { IEntity } from "../common/IEntity";
import type { MaintenanceStatusType } from "./MaintenanceStatus";

export interface IMaintenanceStatus extends IEntity {
    name: MaintenanceStatusType
}