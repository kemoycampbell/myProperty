import { Column, Entity } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import type { IEmergencyContact } from "./IEmergencyContact";

@Entity()
export class EmergencyContact extends BaseEntity implements IEmergencyContact {
    @Column({
        type: 'varchar',
        length: 40,
        name: 'user_tenant_id'
    })

    userTenantID: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'first_name'
    })

    firstName: string;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'lastName'
    })

    lastName: string;

    @Column({
        type: 'varchar',
        length: 'text',
        name: 'email'
    })

    email: string;

    @Column({
        type: 'varchar',
        length: 16,
        name: 'phone'
    })

    phone: string;
};