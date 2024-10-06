import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Parcel } from "./entity/Parcel";
import { Parcel_Actions } from "./entity/Parcel_Action";

dotenv.config();
const PORT =  parseInt(process.env.POSTGRES_PORT,10) || 5432;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Parcel, Parcel_Actions],
    logging: true,
    synchronize: true,
})