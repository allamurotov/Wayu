import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class SocialLinksEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    title!: string;

    @Column({type: "varchar", length: 128})
    icon!: string;

    @Column({type: "varchar", length: 128})
    link!: string
}