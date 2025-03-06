import { UserException } from '$lib/server/exceptions/UserException';
import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { UserService } from '$lib/server/services/userService';
import { json } from '@sveltejs/kit';
import { processAPIRequest } from '../../../../middleware/apiResponse';
import database from '$lib/server/database/database';

const userRepository = new UserRepository(database.createQueryRunner());
const service = new UserService(userRepository);

// POST /api/user/
/**
 * This endpoint is used to authenticate the user
 */
export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    console.log(data);
    const res = await service.authenticate(data.username, data.password);
    return json({status:200, token:res});
});

