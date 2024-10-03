import * as express from "express";
import { Express, Request, Response } from "express";
import { Parcel } from "./entity/Parcel";
import { Parcel_Actions } from "./entity/Parcel_Action";
import { AppDataSource } from "./data-source";
import * as compression from "compression";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.POSTGRES_PORT;

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

// register routes

app.get("/parcels", async (req: Request, res: Response) => {
    try {
        const users = await AppDataSource.getRepository(Parcel).find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// app.get("/parcels/:parcelId", async (req: Request, res: Response) => {
//     const { parcelId } = req.params;
//     try {
//         const parcels = await AppDataSource.getRepository(Parcel).find({
//             where: { parcelId: parcelId }
//         });
//         res.json(parcels);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// start express server
app.listen(PORT, () => {
    console.log(`Server is running and listening at ${PORT}, Open in browser: http://localhost:4000`);
})