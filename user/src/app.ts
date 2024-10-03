import * as express from "express";
import { Express, Request, Response } from "express";
import * as compression from "compression";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.POSTGRES_PORT;

// create and setup express app
const app: Express = express();
app.use(express.json());
app.use(compression());

// start express server
app.listen(3000, () => {
    console.log(`Server is running and listening at ${PORT}, Open in browser: http://localhost:3000`);
})