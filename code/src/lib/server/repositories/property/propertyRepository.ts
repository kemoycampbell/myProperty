import type { IProperty } from "$lib/server/models/entity/property/IProperty";
import { Property } from "$lib/server/models/entity/property/Property";
import { Repository, type QueryRunner } from "typeorm";

export class PropertyRepository extends Repository<IProperty>
{
    constructor(queryRunner: QueryRunner)
    {
        super(Property, queryRunner.manager);
    }
}