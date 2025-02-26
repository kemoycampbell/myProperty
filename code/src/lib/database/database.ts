import pg  from 'pg';

const client = new pg.Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER|| '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    port: parseInt(process.env.POSTGRES_PORT || '5432')
})

export async function connection() {
    return await client.connect();
}


export async function end() {
    return await client.end();
}