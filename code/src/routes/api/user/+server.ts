import database from "$lib/server/database/database";
import { UserRepository } from "$lib/server/repositories/user/UserRepository";
import { RoleRepository } from "$lib/server/repositories/role/RoleRepository";
import { UserService } from "$lib/server/services/userService";
import { processAPIRequest } from "../../../middleware/apiResponse";
import { json } from '@sveltejs/kit';

const userRepository = new UserRepository(database.createQueryRunner());
const roleRepository = new RoleRepository(database.createQueryRunner());
const userService = new UserService(userRepository, roleRepository);

export const GET = processAPIRequest(async () => {
    const users = await userService.getAllUsers();
    return json({ status: 200, users });
});