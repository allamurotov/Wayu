import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class FaqsEntity extends BaseModel {
    @Column({type: "varchar", length: 256})
    question!: string;

    @Column({type: "varchar", length: 512})
    answer!: string;
}