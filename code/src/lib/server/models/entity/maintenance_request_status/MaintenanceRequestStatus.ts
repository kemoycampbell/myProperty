import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceRequestStatus } from "./IMaintenanceRequestStatus";

@Entity()
export class MaintenanceRequestStatus extends BaseEntity implements IMaintenanceRequestStatus {
    @Column ({
        type: 'varchar',
        length: 35,
        name: 'maintenance_request_id'
    })

    maintenanceRequestId: string

    @Column ({
        type: 'varchar',
        length: 35,
        name: 'user_operator_id'
    })

    userOperatorId: string

    @Column ({
        type: 'varchar',
        length: 35,
        name: 'status'
    })

    status: string
}