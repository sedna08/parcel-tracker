import { DataSource } from "typeorm"
import { Parcel } from "./entity/Parcel"

export const myDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [__dirname + "./src/entity/*.ts"],
    logging: true,
    synchronize: true,
})