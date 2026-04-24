import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class CountriesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string;

    @Column({type: "varchar", length: 128})
    flag!: string;
}