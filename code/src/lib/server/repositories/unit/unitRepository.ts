import type { IUnit } from "$lib/server/models/entity/unit/IUnit";
import { Unit } from "$lib/server/models/entity/unit/Unit";
import { Repository, type QueryRunner } from "typeorm";

export class UnitRepository extends Repository<IUnit>
{
    constructor(queryRunner: QueryRunner)
    {
        super(Unit, queryRunner.manager);
    }
}