import { DataSource} from "typeorm";
import type { MixedList } from "typeorm/browser";

export default class Database {
    private source: DataSource;

    constructor(
        host: string, 
        port: number, 
        database: string, 
        user: string, 
        password: string,
        isProduction:boolean
        ) 
    {


        this.source = new DataSource({
            type: "postgres",
            host: host,
            port: port,
            username: user,
            password: password,
            database: database,
            synchronize: isProduction,
            logging: "all",
        })
    }

    public configure(entities: any[], migrations:MixedList<Function | string>): void {
        this.source.setOptions({
            entities: entities,
            migrations: migrations
        })

    }

    async initialize(): Promise<void> {
        try {
            await this.source.initialize();
            //TOD throw custom error
            console.log("Database connection established.");
        } catch (error) {
            //throw custom error
            console.error("Error initializing database:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    getSource(): DataSource {
        return this.source;
    }

    async close(): Promise<void> {
        if (this.source.isInitialized) {
            await this.source.destroy();
            console.log("Database connection closed.");
        }
    }
}