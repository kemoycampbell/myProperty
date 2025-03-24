import { Repository, type QueryRunner } from "typeorm";
import type { IRole } from '../../models/entity/role/IRole';
import { Role, RoleType } from "$lib/server/models/entity/role/Role";

export class RoleRepository extends Repository<IRole>
{ 

    constructor(queryRunner: QueryRunner) {
        super(Role, queryRunner.manager);
    }

    async findByName(role: RoleType): Promise<IRole> {
        console.log("here");
        const result = await this.findOne({ where: { name: role } });
        if (!result) {
            throw new Error(`Role with name ${role} not found`);
        }
        return result;
    }
}