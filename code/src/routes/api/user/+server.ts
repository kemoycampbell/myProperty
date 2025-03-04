import { UserException } from '$lib/server/exceptions/UserException';
import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { AuthenticateService } from '$lib/server/services/AuthenticateService';
import { dbInstance } from '$lib/stores/databaseStore';
import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { DataSource } from 'typeorm';
import { processAPIRequest } from '../../../middleware/apiResponse';

const db: DataSource | null = get(dbInstance); 
const userRepository = new UserRepository(db!.manager);
const service = new AuthenticateService(userRepository);


export const POST = processAPIRequest(async ({ request }) => {
    const data = await request.json();
    await service.register(data.username, data.password);
    const res = await userRepository.find();
    return json(res);
});


