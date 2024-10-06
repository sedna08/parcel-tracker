"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './components/Header';

enum Parcel_Status{
    IN_TRANSIT="In Transit",
    DELIVERED="Delivered",
    CANCELLED="Cancelled",
    RETURNED_TO_SELLER="Returned To Seller",
    DELIVERY_ATTEMPT_FAILED="Delivery Attempt Failed",
    RECEIVED="Received",
    NOT_YET_RECEIVED="Not Yet Received"
}
interface ParcelActions{
    action_id: number;
    parcel: Parcel;
    details: string;
    action_date_timestamp: Date;
}

interface Parcel {
    parcel_id: string;
    parcel_actions: ParcelActions[];
    status: Parcel_Status;
    parcelDateReceived: Date;
}

export default function Home() {

    const apiUrl = process.env.BACKEND_URL || "http://localhost:4000";
    const [parcelActions, setParcelActions] = useState<ParcelActions[]>([]);
    const [searchParcel, setSearchParcel] = useState({parcel_id: ''})

    const getParcels = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // const response = await axios.get(`${apiUrl}/parcels/${searchParcel.parcel_id}/actions`);
            const response = await axios.get(`${apiUrl}/parcels`);
            setParcelActions(response.data.reverse());
        } catch(error) {
            console.error('Error getting parcel:', error);
        }
    }
    return (

        <div>
            <Header />

            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="space-y-4 w-full max-w-full">
                    <form onSubmit= {getParcels} className="flex flex-col items-center justify-center p-4 bg-white-100 rounded">
                        <input
                            placeholder="Enter Parcel ID"
                            value={searchParcel.parcel_id}
                            onChange={(e) => setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}
                            className="mb-2 w-5/6 p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="w-5/6 p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Find Parcel
                        </button>
                    </form>
                </div>
            </main>
            
        </div>
    )

}
