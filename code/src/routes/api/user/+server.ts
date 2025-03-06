import { UserException } from '$lib/server/exceptions/UserException';
import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { AuthenticateService } from '$lib/server/services/userService';
import { json } from '@sveltejs/kit';
import { processAPIRequest } from '../../../middleware/apiResponse';
import database from '$lib/server/database/database';

const userRepository = new UserRepository(database.createQueryRunner());
const service = new AuthenticateService(userRepository);

// POST /api/user/
/**
 * This endpoint is used to register a new user
 */
export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    const res = await service.register(data.username, data.password, data.role);
    return json({status:200, token:res});
});


// /**
//  * This endpoint is used to authenticate a user
//  */
// export const GET = processAPIRequest(async ({ request }) => {
//     const data = await request.json();
//     const res = await service.authenticate(data.username, data.password);
//     return json({status:200, token:res});
// });


