import { UserRepository } from '$lib/server/repositories/User/UserRepository';
import { AuthenticateService } from '$lib/server/services/AuthenticateService';
import { dbInstance } from '$lib/stores/databaseStore';
import { json } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { DataSource } from 'typeorm';


const db: DataSource | null = get(dbInstance); 
const userRepository = new UserRepository(db!.manager);
const service = new AuthenticateService(userRepository);

export async function GET({ request }) {
    
    //fake create a user
    await service.register("test2", "password");
    const users = await userRepository.find();

    return json(users);


}

export async function POST({ request }) {
    const db: DataSource | null = get(dbInstance); // ✅ Get database synchronously

    if (!db) {
        console.error("Database is not initialized!");
        return json({ error: "Database not initialized" }, { status: 500 });
    }

    const data = await request.json();
    const service = new AuthenticateService(new UserRepository(db.manager));

    try {
        const token = await service.register(data.username, data.password);
        console.log("Generated Token:", token);
        return json({ token });
    } catch (error) {
        console.error("Error during registration:", error);
        return json({ error: "Registration failed" }, { status: 500 });
    }
}
