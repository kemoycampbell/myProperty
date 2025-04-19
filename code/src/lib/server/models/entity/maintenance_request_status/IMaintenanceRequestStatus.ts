import type { IEntity } from "../common/IEntity";
import type { MaintenanceStatus } from "../maintenance_status/MaintenanceStatus";

export interface IMaintenanceRequestStatus  extends IEntity{
    maintenanceRequestId: string;
    userOperatorId: string;
    status: MaintenanceStatus
  }  