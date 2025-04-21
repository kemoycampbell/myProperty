import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IMaintenanceRequest } from "./IMaintenanceRequest";
import { User } from "../User/User";

@Entity()
export class MaintenanceRequest extends BaseEntity implements IMaintenanceRequest {
    @Column ({
        type: 'varchar',
        length: 40,
        name: 'user_requested_id'
    })
    userRequestedId: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_requested_id' })
    user: User;

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