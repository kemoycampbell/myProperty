import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceRequestStatus } from "./IMaintenanceRequestStatus";
import { MaintenanceStatus } from "../maintenance_status/MaintenanceStatus";

@Entity()
export class MaintenanceRequestStatus extends BaseEntity implements IMaintenanceRequestStatus {
    @Column ({
        type: 'varchar',
        length: 40,
        name: 'maintenance_request_id'
    })

    maintenanceRequestId: string

    @Column ({
        type: 'varchar',
        length: 40,
        name: 'user_operator_id'
    })

    userOperatorId: string

    @Column ({
        type: 'varchar',
        length: 40,
        name: 'status'
    })

    @ManyToOne(()=> MaintenanceStatus, (status) => status.id)
    @JoinColumn()
    status: MaintenanceStatus
}