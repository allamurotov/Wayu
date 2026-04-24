import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class TagsEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string;
}