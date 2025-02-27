import { Pool, type PoolClient } from "pg";

class Database {
    private pool: Pool;
    private client?: PoolClient; // Store the client connection

    constructor(host: string, port: number, database: string, user: string, password: string) {
        this.pool = new Pool({
            host,
            port,
            database,
            user,
            password
        });
    }

    async insert(table: string, columns: string[], params: any[], returnsColumns: string[] = []) {
        await this.connect(); // Ensure a connection before inserting

        // Automatic generate the number of $1 based on the columns
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

        // Do we have a returning clause?
        let returnClause = "";
        if (returnsColumns.length > 0) {
            returnClause = `RETURNING ${returnsColumns.join(", ")}`;
        }

        // SQL query
        const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES(${placeholders}) ${returnClause}`;

        return await this.client!.query(sql, params);
    }

    async connect(): Promise<void> {
        if (!this.client) {
            this.client = await this.pool.connect(); // Get a client from the pool
        }
    }

    async disconnect(): Promise<void> {
        if (this.client) {
            this.client.release(); // Release client back to the pool
            this.client = undefined; // Reset client
        }
        await this.pool.end();
    }
}

export default Database;
