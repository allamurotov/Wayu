import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class ExpensesEntity extends BaseModel {
    @Column({type: "decimal", precision: 12, scale: 2})
    amount!: string;

    @Column({type: "timestamp"})
    date!: string;

    @Column({type: "varchar", length: 256})
    title!: string;

    @Column({type: "text"})
    description?: string;

    @Column({type: "varchar", length: 64})
    transactionId!: string;
}