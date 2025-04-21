import { json } from '@sveltejs/kit';
import database from "$lib/server/database/database";
import { RoleType } from "$lib/server/models/entity/role/Role";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "$middleware/apiResponse";

const runner = database.createQueryRunner();
const userRepository = new UserRepository(runner);
const roleRepository = new RoleRepository(runner);
const userService = new UserService(userRepository, roleRepository);

export const GET = processAPIRequest(async () => {
    const users = await userService.getAllUsersByRole(RoleType.MAINTENANCE_OPERATOR);
    return json({ users });
});
