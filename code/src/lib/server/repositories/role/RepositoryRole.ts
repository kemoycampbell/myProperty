import { Repository, type QueryRunner } from "typeorm";
import type { IRole } from '../../models/entity/role/IRole';
import { Role } from "$lib/server/models/entity/role/Role";

export class RepositoryRole extends Repository<Role> { // Use Role, not IRole

    constructor(queryRunner: QueryRunner) {
        super(Role, queryRunner.manager);
    }
}