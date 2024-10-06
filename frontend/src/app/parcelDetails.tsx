
export enum Parcel_Status{
    IN_TRANSIT="In Transit",
    DELIVERED="Delivered",
    CANCELLED="Cancelled",
    RETURNED_TO_SELLER="Returned To Seller",
    DELIVERY_ATTEMPT_FAILED="Delivery Attempt Failed",
    RECEIVED="Received",
    NOT_YET_RECEIVED="Not Yet Received"
}
export interface ParcelActions{
    action_id: number;
    parcel: Parcel;
    details: string;
    action_date_timestamp: string;
}

export interface Parcel {
    parcel_id: string;
    parcel_actions: ParcelActions[];
    status: Parcel_Status;
    parcelDateReceived: Date;
}