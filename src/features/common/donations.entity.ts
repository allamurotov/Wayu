import {BaseModel} from "../../core/base-model";
import {PaymentProvider} from "../../core/enum/enum";
import {Column} from "typeorm";

export class DonationsEntity extends BaseModel {
    @Column({type: "decimal", precision: 12, scale: 2})
    amount!: string;

    @Column({type: 'varchar', length: 128})
    fullName!: string;

    @Column({type: 'timestamp'})
    date!: string;

    @Column({type: "enum", enum: PaymentProvider})
    paidBy!: PaymentProvider;
}