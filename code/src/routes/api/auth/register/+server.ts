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
export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    const res = await service.register(
        data.firstName,
        data.lastName,
        data.email,
        data.username, 
        data.password, 
        data.role
    );
    return json({status:200, token:res});
});

