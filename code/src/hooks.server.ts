//https://svelte.dev/docs/kit/hooks#Shared-hooks-init
import 'reflect-metadata';
import Database from '$lib/server/database/database';
import { ENTITIES } from '$lib/server/database/entities';
import type { ServerInit } from '@sveltejs/kit';
import dotenv from 'dotenv'; 
import { dbInstance } from '$lib/stores/databaseStore';
import type { HandleServerError } from '@sveltejs/kit';
import { UserException } from '$lib/server/exceptions/UserException';
import { error, json } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';


export const init: ServerInit = async () => {
    // You can do things like fetch data or set up a database connection here.
    // This will run on the server each time the app is started, but only once per deployment.
    console.log('Server init');


    //load the dotenv file
    dotenv.config();

    const host = process.env.DATABASE_HOST|| 'localhost';
    const port = parseInt(process.env.DATABASE_PORT || '5432');
    const database = process.env.DATABASE_NAME || 'sveltekit';
    const user = process.env.DATABASE_USER || 'postgres';
    const password = process.env.DATABASE_PASSWORD || 'password';
    const isProduction = false;


    //create a new instance of the database
    const db = new Database(host, port, database, user, password, isProduction);
    db.configure(ENTITIES, []);
    await db.initialize();
    console.log(ENTITIES);
    await db.getSource().synchronize();

    //we will expose the database source through the svelte store
    dbInstance.set(db.getSource());


}

export const handle: Handle = async ({ event, resolve }) => {
  
	const response = await resolve(event);
  console.log(response.status);

	// Note that modifying response headers isn't always safe.
	// Response objects can have immutable headers
	// (e.g. Response.redirect() returned from an endpoint).
	// Modifying immutable headers throws a TypeError.
	// In that case, clone the response or avoid creating a
	// response object with immutable headers.
  response.headers.set('Content-Type', 'application/json');

	return response;
};