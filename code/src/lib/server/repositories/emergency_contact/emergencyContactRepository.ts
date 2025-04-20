import { EmergencyContact } from "$lib/server/models/entity/emergency_contact/EmergencyContact";
import type { IEmergencyContact } from "$lib/server/models/entity/emergency_contact/IEmergencyContact";
import { Repository, type QueryRunner } from "typeorm";


export class EmergencyContactRepository extends Repository<IEmergencyContact> {
    constructor(queryRunner: QueryRunner) {
        super(EmergencyContact, queryRunner.manager);
    }
};