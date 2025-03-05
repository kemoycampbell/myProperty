import { UserException } from '$lib/server/exceptions/UserException';
import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { AuthenticateService } from '$lib/server/services/AuthenticateService';
import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { DataSource } from 'typeorm';
import { processAPIRequest } from '../../../middleware/apiResponse';
import database from '$lib/server/database/database';

const userRepository = new UserRepository(database!.manager);
const service = new AuthenticateService(userRepository);


export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    await service.register(data.username, data.password);
    const res = await userRepository.find();
    return json(res);
});


