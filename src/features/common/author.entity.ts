import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class AuthorEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    fullName!: string
}