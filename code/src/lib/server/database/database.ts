
import { DataSource, type DataSourceOptions } from "typeorm";
import { ENTITIES } from "./entities";

import dotenv from "dotenv";

//load the dotenv file
dotenv.config();

const config: DataSourceOptions = {
    type: "postgres",
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT)!,
    database: process.env.DATABASE_NAME!,
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    entities: ['src/lib/server/models/entity/**/*.ts'],
    migrations: ['src/lib/server/database/migrations/**/*.ts'],  // Local migrations directory
    synchronize: false,
    logging: "all",
};

export default new DataSource({
    ...config
});

