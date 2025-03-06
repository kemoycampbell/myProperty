import { UserException } from '$lib/server/exceptions/UserException';
import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { UserService } from '$lib/server/services/userService';
import { json } from '@sveltejs/kit';
import database from '$lib/server/database/database';
import { processAPIRequest } from '../../../../middleware/apiResponse';

const userRepository = new UserRepository(database.createQueryRunner());
const service = new UserService(userRepository);

// POST /api/user/
/**
 * This endpoint is used to register a new user
 */
export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    const res = await service.register(data.username, data.password, data.role);
    return json({status:200, token:res});
});

