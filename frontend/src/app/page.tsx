"use client";
import React, {useState} from 'react';
import axios from 'axios';
import Header from './components/Header';
import ParcelActionComponent from './components/ParcelActionComponent';
import { ParcelActions} from './parcelDetails';


export default function Home() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // console.log(apiUrl);
    const [searchButtonClicked, setSearchButtonClicked] = useState('false');
    const [parcelActions, setParcelActions] = useState<ParcelActions[]>([]);
    // const [parcels, setParcels] = useState<Parcel[]>([]);
    const [searchParcel, setSearchParcel] = useState({parcel_id: ''})

    const getParcelActions = async(e: React.FormEvent<HTMLFormElement>) => {
        setSearchButtonClicked('true');
        e.preventDefault();
        try {
            const response = await axios.get(`${apiUrl}/parcels/${searchParcel.parcel_id}/actions`);
            //console.log(response.data.reverse());
            setParcelActions(response.data.reverse());
            //setSearchParcel({parcel_id: ''});
            console.log(parcelActions)
        } catch(error) {
            setParcelActions([]);
            //console.log(parcelActions)
            console.error('Error getting parcel:', error);
        }
    }

    // const getParcels = async(e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         // const response = await axios.get(`${apiUrl}/parcels/${searchParcel.parcel_id}/actions`);
    //         const response = await axios.get(`${apiUrl}/parcels`);
    //         //console.log(response.data.reverse())
    //         setParcels(response.data.reverse());
    //     } catch(error) {
    //         console.error('Error getting parcel:', error);
    //     }
    // }

    return (

        <div>
            <Header />

            <main className="flex flex-col items-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-full">
                    <form onSubmit= {getParcelActions} className="flex flex-col w-full items-center justify-center p-4 bg-white-100 rounded">
                        <input
                            placeholder="Enter Parcel ID"
                            value={searchParcel.parcel_id}
                            onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="mb-2 w-5/6 p-2 border border-gray-300 rounded"
                        />
                        <button type="submit" className="w-5/6 p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Find Parcel
                        </button>
                    </form> 
                    <div className="space-y-2 w-5/6 ">
                        {(parcelActions.length > 0)? (
                            <>
                                {parcelActions.map((parcelActions) => (
                                    <div key={parcelActions.action_id} className="flex flex-col shadow items-center justify-between p-4 rounded-lg">
                                    <ParcelActionComponent parcelAction={parcelActions} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                            {(searchButtonClicked === 'true')? (
                                    <div className='flex justify-center'>
                                    <p className='text-lg font-semibold center text-red-500'>
                                        Parcel Not Found
                                        </p>
                                    </div>
                                ): (
                                    <>
                                    </>
                                )
                            }
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
