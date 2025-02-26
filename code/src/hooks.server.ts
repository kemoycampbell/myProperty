
import { connection } from "$lib/database/database";
import type { Handle, ServerInit } from "@sveltejs/kit";
import * as dotenv from 'dotenv';

//https://svelte.dev/docs/kit/hooks



//only run once when the server or the app starts
//this is where you can do things like connect to a database
//https://svelte.dev/docs/kit/hooks#Shared-hooks-init
export const init: ServerInit = async () => {

    //load the .env file
    dotenv.config();
    const db = await connection

    const res = await db.query('SELECT * FROM profile');

    
};

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

    const  user = process.env.POSTGRES_USER;

    console.log(user);

	const response = await resolve(event);
	return response;
};