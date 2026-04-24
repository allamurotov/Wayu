import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class BookCategoriesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string
}