import {BaseModel} from "../../core/base-model";
import {Column, ManyToOne} from "typeorm";
import {CountriesEntity} from "./countries.entity";

export class BranchesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    city!: string;

    @Column({type: "decimal", precision: 10, scale: 7})
    latitude!: string;

    @Column({type: "decimal", precision: 10, scale: 7})
    longitude!: string;

    @Column({type: "varchar", length: 16})
    phoneNumber!: string

    @Column()
    countryId!: number;

    @Column()
    representativeId!: number;

    @ManyToOne(() => CountriesEntity, (country)=> country.id)
    country!: CountriesEntity;
}