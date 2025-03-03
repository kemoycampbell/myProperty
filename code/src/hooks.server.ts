//https://svelte.dev/docs/kit/hooks#Shared-hooks-init
import 'reflect-metadata';
import Database from '$lib/server/database/database';
import { ENTITIES } from '$lib/server/database/entities';
import type { ServerInit } from '@sveltejs/kit';
import dotenv from 'dotenv'; 
import { dbInstance } from '$lib/stores/databaseStore';
import type { HandleServerError } from '@sveltejs/kit';
import { UserException } from '$lib/server/exceptions/UserException';


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

//hook into svelte kit response. We want to show the user the error responses when they are
//part of the UserException
export const handleError = ({ error, event }) => {
    if (event.url.pathname.startsWith('/api')) {
      try {
        // Attempt to parse the error response as JSON
        const jsonError = JSON.parse(error.message);
        return {
          message: jsonError.message || 'API Error',
          code: jsonError.code || 500,
          // Include other relevant error details from the JSON response
        };
      } catch (parseError) {
        // If JSON parsing fails, return a generic API error
        return {
          message: 'An unexpected API error occurred.',
          code: 500,
        };
      }
    }
  
    // Let Svelte handle other errors
    return {
      message: error.message,
      stack: import.meta.env.DEV ? error.stack : undefined, // Include stack in dev mode
    };
  };