import database from "$lib/server/database/database";
import type { ITenant } from "$lib/server/models/entity/Tenant/ITenant";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { TenantRepository } from "$lib/server/repositories/tenant/tenantRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { TenantService } from "$lib/server/services/tenantService";
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "$middleware/apiResponse";
import { json } from "@sveltejs/kit";


const runner = database.createQueryRunner();

const tenantRepository = new TenantRepository (runner);
const unitRepository = new UnitRepository(runner);
const userRepository = new UserRepository(runner);
const roleRepository = new RoleRepository(runner);

const userService = new UserService(userRepository, roleRepository);
    
const tenantService = new TenantService(tenantRepository, userService, unitRepository);

export const POST = processAPIRequest(async ({ request, params }) => {
    const data = await request.json();
    const tenant: Partial<ITenant> = {
        tenant: data.tenant,
        unit: data.unit,
        startDate: data.startDate,
        endDate: data.endDate
    };

    const rent = await tenantService.rent(tenant);
    return json({
        status: 200,
        message: "Successfully rent to tenant"
    });
});
    