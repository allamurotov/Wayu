import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class NewsCategoriesEntity extends BaseModel {
    @Column({type: "varchar", length: 64, unique: true})
    title!: string
}