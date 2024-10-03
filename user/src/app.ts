import * as express from "express";
import { Express, Request, Response } from "express";
import { Parcel, Parcel_Status } from "./entity/Parcel";
import { Parcel_Actions } from "./entity/Parcel_Action";
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

// register routes

app.get("/parcels", async (req: Request, res: Response) => {
    try {
        const parcels = await AppDataSource.getRepository(Parcel).find();
        res.json(parcels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/parcels/:parcel_id/actions', async (req: Request, res: Response) => {
    try {
        const parcelRepository = AppDataSource.getRepository(Parcel);
        
        // Use findOne instead of findOneBy, and load relations for parcel_actions
        const requested_parcel = await parcelRepository.findOne({
            where: { parcel_id: req.params.parcel_id },
            relations: ["parcel_actions"], // Load related actions
        });

        if (!requested_parcel) {
            res.status(404).json({ error: "Parcel not found" });
            return
        }

        // parcel_actions will already be loaded with the requested_parcel
        res.status(200).json(requested_parcel.parcel_actions);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/parcels", async (req: Request, res: Response) => {
    try {
        const parcelRepository = AppDataSource.getRepository(Parcel);
        const parcelActionsRepository = AppDataSource.getRepository(Parcel_Actions);

        // Create a new Parcel entity
        const newParcel = new Parcel();
        newParcel.status = Parcel_Status.NOT_YET_RECEIVED;
        newParcel.parcelDateReceived = new Date();

        // Save the Parcel entity
        const savedParcel = await parcelRepository.save(newParcel);

        // Create a new Parcel_Actions entity
        const newParcelAction = new Parcel_Actions();
        newParcelAction.parcel = savedParcel;
        newParcelAction.details = 'Not Yet Received';
        newParcelAction.action_date_timestamp = savedParcel.parcelDateReceived;

        // Save the Parcel_Actions entity
        await parcelActionsRepository.save(newParcelAction);

        res.status(201).json(savedParcel);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/parcels/:parcel_id/status', async (req: Request, res: Response) => {
    const parcelRepository = AppDataSource.getRepository(Parcel);
    const parcelActionsRepository = AppDataSource.getRepository(Parcel_Actions);
    
    const { status } = req.body;
    const { parcel_id } = req.params;

    try {
        // Validate if the provided status is a valid enum value
        if (!Object.values(Parcel_Status).includes(status)) {
            res.status(400).json({ error: "Invalid status value" });
            return
        }

        // Find the parcel by UUID
        const parcelToUpdate = await parcelRepository.findOneBy({ parcel_id });

        if (!parcelToUpdate) {
            res.status(404).json({ error: "Parcel not found" });
            return 
        }

        // Update the parcel's status
        const previousStatus = parcelToUpdate.status; // Save the previous status for action details
        parcelToUpdate.status = status as Parcel_Status;

        // Create a new Parcel_Actions entry to record the status change
        const newParcelAction = new Parcel_Actions();
        newParcelAction.parcel = parcelToUpdate;
        newParcelAction.details = `Status changed from ${previousStatus} to ${status}`;
        newParcelAction.action_date_timestamp = new Date(); // Set current time for the action

        // Transaction: Save both the updated Parcel and the new Parcel_Action
        await AppDataSource.transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(parcelToUpdate); // Save updated parcel status
            await transactionalEntityManager.save(newParcelAction); // Save the new action
        });

        res.status(200).json({
            message: "Parcel status updated and action logged successfully",
            updatedParcel: parcelToUpdate,
            actionLogged: newParcelAction
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// start express server
app.listen(PORT, () => {
    console.log(`Server is running and listening at ${PORT}, Open in browser: http://localhost:4000`);
})