import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, BeforeInsert} from "typeorm"
import { Parcel_Actions } from "./Parcel_Action"

export enum Parcel_Status{
    IN_TRANSIT="In Transit",
    DELIVERED="Delivered",
    CANCELLED="Cancelled",
    RETURNED_TO_SELLER="Returned To Seller",
    DELIVERY_ATTEMPT_FAILED="Delivery Attempt Failed",
    RECEIVED="Received",
    NOT_YET_RECEIVED="Not Yet Received"
}

@Entity()
export class Parcel {
    @PrimaryColumn()
    parcel_id: string

    @OneToMany(() => Parcel_Actions, (parcel_actions) => parcel_actions.parcel)
    parcel_actions: Parcel_Actions[]

    @Column( {
        type: "enum",
        enum: Parcel_Status,
        default: Parcel_Status.NOT_YET_RECEIVED
    })
    status: Parcel_Status;

     @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    parcelDateReceived: Date;

    @BeforeInsert()
    generateID() {
        this.parcel_id = this.generateNumericID();
        this.parcelDateReceived = new Date();
    }

    private generateNumericID():string {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
}