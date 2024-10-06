import React from 'react';
import {ParcelActions} from '../parcelDetails';

const ParcelActionComponent: React.FC<{ parcelAction: ParcelActions }> = ({ parcelAction }) => {
    // const formattedDate = parcelAction.action_date_timestamp.toLocaleDateString('en-US');
    const date = new Date( parcelAction.action_date_timestamp);
    const formattedDate = date.toLocaleDateString('en-US')

    return (
        <div className ="container mx-auto flex justify-between items-center rounded-lg p-2 mb-2 hover:bg-gray-100">
        <div className ="text-lg font-semibold text-gray-800">{formattedDate}</div>
        <div className ="text-lg font-semibold text-gray-800">{parcelAction.details}</div>
        </div>
    );
}

export default ParcelActionComponent;
