import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class EventsEntity extends BaseModel {
    @Column({type: "varchar", length: 256})
    title!: string;

    @Column({type: "text"})
    content!: string;

    @Column({type: "varchar", length: 128})
    image!: string;

    @Column({type: "timestamp"})
    date!: string;

    @Column({type: "varchar", length: 128})
    address!: string;
}