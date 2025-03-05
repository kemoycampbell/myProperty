//https://svelte.dev/docs/kit/hooks#Shared-hooks-init
import 'reflect-metadata';
import type {ServerInit } from '@sveltejs/kit';
import database from '$lib/server/database/database';



export const init: ServerInit = async () => {
    // You can do things like fetch data or set up a database connection here.
    // This will run on the server each time the app is started, but only once per deployment.
    console.log('Server init');



    ;
    await database.initialize();
    database.synchronize()


}


