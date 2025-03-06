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
export const DELETE = processAPIRequest(async ({ params }) => {
    const data = params.id;
    const res = await service.delete(data);
    return json({status:200, msg:"Your account was successfully deleted"});
});

