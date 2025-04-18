import { UserRepository } from '$lib/server/repositories/user/UserRepository';
import { UserService } from '$lib/server/services/userService';
import { json } from '@sveltejs/kit';
import database from '$lib/server/database/database';
import { processAPIRequest } from '../../../../middleware/apiResponse';
import { RoleRepository } from '$lib/server/repositories/role/RoleRepository';

const userRepository = new UserRepository(database.createQueryRunner());
const roleRepository = new RoleRepository(database.createQueryRunner());
const service = new UserService(userRepository, roleRepository);

// POST /api/user/
/**
 * This endpoint is used to register a new user
 */
export const DELETE = processAPIRequest(async ({ params }) => {
    const data = params.id;
    await service.delete(data);
    return json({status:200, msg:"Your account was successfully deleted"});
});

