import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import Header from './components/Header';

export default function Home() {

    const getParcels = async {

    }
    return (

        <div>
            <Header />

            <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="space-y-4 w-full max-w-2xl">
                    <form onSubmit={getParcels} className ="">
                    </form>
                </div>
            </main>
            
        </div>
    )

}
