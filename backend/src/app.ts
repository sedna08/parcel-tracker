import * as express from "express";
import "reflect-metadata"
import parcelRoutes from "./routes/parcelRoutes"
import { Express, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as cors from 'cors';

dotenv.config();


const PORT = parseInt(process.env.SERVER_PORT,10);

const HOST = '0.0.0.0';

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
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(compression());
app.use(parcelRoutes);

// start express server
app.listen(PORT, HOST, () => {
    console.log(`Server is running and listening at ${PORT}`);
})