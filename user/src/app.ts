import * as express from "express";
import parcelRoutes from "./routes/ParcelRoutes"
import { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as compression from "compression";
import * as dotenv from "dotenv";

dotenv.config();


const PORT = process.env.SERVER_PORT;

// establish database connection
AppDataSource
    .initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

// create and setup express app
const app: Express = express();
app.use(express.json());
app.use(compression());
app.use(parcelRoutes);

// start express server
app.listen(PORT, () => {
    console.log(`Server is running and listening at ${PORT}, Open in browser: http://localhost:4000`);
})