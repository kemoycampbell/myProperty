import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceRequest } from "./IMaintenanceRequest";

@Entity()
export class MaintenanceRequest extends BaseEntity implements IMaintenanceRequest {
    @Column ({
        type: 'varchar',
        length: 40,
        name: 'user_requested_id'
    })

    userRequestedId: string;

    @Column({
        type: 'varchar',
        length: 40,
        name: 'unit_id' 
    })

    unitId: string;

    @Column({
        type: 'text',
        name: 'description'
    })
    
    description: string;
};