import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + "./src/entity/*.ts"],
    logging: true,
    synchronize: true,
})