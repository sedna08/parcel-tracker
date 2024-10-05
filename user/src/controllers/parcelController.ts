import { Request, Response } from "express";
import { Parcel, Parcel_Status } from "../entity/Parcel";
import { Parcel_Actions } from "../entity/Parcel_Action";
import { AppDataSource } from "../data-source";


export const getParcels = async (req:Request, res: Response) => {
    try {
        const parcels = await AppDataSource.getRepository(Parcel).find();
        res.json(parcels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getParcelActions = async (req: Request, res: Response) => {
    try {
        const parcelRepository = AppDataSource.getRepository(Parcel);
        const parcelActionsRepository = AppDataSource.getRepository(Parcel_Actions);

        const { parcel_id } = req.params;

        // Fetch the parcel by UUID
        const requested_parcel = await parcelRepository.findOne({
            where: { parcel_id },
            relations: ['parcel_actions'], // Load parcel actions with the parcel
        });

        if (!requested_parcel) {
            res.status(404).json({ error: "Parcel not found" });
            return;
        }

        res.status(200).json(requested_parcel.parcel_actions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateParcelStatus = async (req: Request, res: Response) => {
    const parcelRepository = AppDataSource.getRepository(Parcel);
    const parcelActionsRepository = AppDataSource.getRepository(Parcel_Actions);
    
    const { status } = req.body;
    const { parcel_id } = req.params;

    try {
        // Validate if the provided status is a valid enum value
        if (!Object.values(Parcel_Status).includes(status)) {
            res.status(400).json({ error: "Invalid status value" });
            return;
        }

        // Find the parcel by UUID
        const parcelToUpdate = await parcelRepository.findOneBy({ parcel_id });

        if (!parcelToUpdate) {
            res.status(404).json({ error: "Parcel not found" });
            return;
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
}

export const createParcel = async (req: Request, res: Response) => {
    try {
        const parcelRepository = AppDataSource.getRepository(Parcel);
        const parcelActionsRepository = AppDataSource.getRepository(Parcel_Actions);

        // Create a new Parcel entity
        const newParcel = new Parcel();
        newParcel.status = Parcel_Status.NOT_YET_RECEIVED;

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
}