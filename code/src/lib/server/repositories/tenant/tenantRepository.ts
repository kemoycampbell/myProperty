import { UserException } from "$lib/server/exceptions/UserException";
import type { ITenant } from "$lib/server/models/entity/Tenant/ITenant";
import { Tenant } from "$lib/server/models/entity/Tenant/Tenant";
import { Repository, type QueryRunner } from "typeorm";

export class TenantRepository extends Repository<ITenant>
{
        constructor(source: QueryRunner)
        {
            super(Tenant, source.manager);
        }
        
    async findByPropertyId(propertyId:string): Promise<ITenant>
    {
        const result = await this.findOne({
            where: { property: { id: propertyId } }
            //relations: ["property"],
        });

        if (!result)
        {
            throw new UserException(`Tenant with property ID ${propertyId} not found`);
        }
        return result;
    }

}