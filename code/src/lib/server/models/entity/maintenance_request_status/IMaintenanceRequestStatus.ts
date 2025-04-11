import type { MaintenanceStatus } from "../maintenance_status/MaintenanceStatus";

export interface IMaintenanceRequestStatus {
    maintenanceRequestId: string;
    userOperatorId: string;
    status: MaintenanceStatus
  }  