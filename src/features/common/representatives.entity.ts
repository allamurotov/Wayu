import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class RepresentativesEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    fullName!: string

    @Column({type: "varchar", length: 128})
    image!: string

    @Column({type: "varchar", length: 64})
    email!: string

    @Column({type: "varchar", length: 16})
    phoneNumber!: string

    @Column({type: "text"})
    resume!: string
}