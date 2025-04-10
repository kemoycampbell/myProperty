import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceRequestPhoto } from "./IMaintenanceRequestPhoto";

@Entity()
export class MaintenanceRequestPhoto extends BaseEntity implements IMaintenanceRequestPhoto {
    @Column ({
        type: 'varchar',
        length: 35,
        name: 'maintenance_request_id'
    })

    maintenanceRequestID: string;

    @Column ({
        type: 'varchar',
        length: 35,
        name: 'maintenance_request_status_id'
    })

    maintenanceRequestStatusID: string;

    @Column ({
        type: 'varchar',
        length: 35,
        name: 'user_uploaded_id'
    })

    userUploadedId: string;

    @Column ({
        type: 'text',
        name: 'url'
    })

    url: string;
};