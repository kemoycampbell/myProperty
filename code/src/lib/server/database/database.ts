
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
    entities: ENTITIES,
    migrations: [],  // Local migrations directory
    synchronize: true,
    logging: true
};

export default new DataSource({
    ...config
});

