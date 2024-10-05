import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm"
import { Parcel } from "./Parcel"

@Entity()
export class Parcel_Actions {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    action_id: number

    @ManyToOne(() => Parcel, (parcel) => parcel.parcel_actions)
    parcel: Parcel

    @Column({
        type: "varchar"
    })
    details: string

     @Column({
        type: "timestamp"
     })
    action_date_timestamp: Date;
}