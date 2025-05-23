import database from "$lib/server/database/database";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { TenantRepository } from "$lib/server/repositories/tenant/tenantRepository";
import { UnitRepository } from "$lib/server/repositories/unit/unitRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { TenantService } from "$lib/server/services/tenantService";
import { json } from '@sveltejs/kit';
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "../../../../../middleware/apiResponse";

const runner = database.createQueryRunner();

const tenantRepository: TenantRepository = new TenantRepository(runner);
const unitRepository: UnitRepository = new UnitRepository(runner);
const userRepository: UserRepository = new UserRepository(runner);
const roleRepository: RoleRepository = new RoleRepository(runner);
const userService: UserService = new UserService(userRepository, roleRepository);

const tenantService: TenantService = new TenantService(tenantRepository, userService, unitRepository)

export const GET = processAPIRequest(async ({ params }) => {
    const data = params.id;
    console.log(data);
    const res = await tenantService.getTenantById(data);
    return json({status:200, data:res});
});