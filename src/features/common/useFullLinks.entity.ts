import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";

export class UseFullLinksEntity extends BaseModel {
    @Column({type: "varchar", length: 128})
    title!: string;

    @Column({type: "varchar", length: 128})
    icon!: string;

    @Column({type: "varchar", length: 128})
    link!: string
}