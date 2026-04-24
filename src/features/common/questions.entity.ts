import {BaseModel} from "../../core/base-model";
import {Column} from "typeorm";
import {QuestionsStatus} from "../../core/enum/enum";

export class QuestionsEntity extends BaseModel {
    @Column({type: "varchar", length: 64})
    fullName!: string;

    @Column({type: "varchar", length: 16})
    phoneNumber!: string;

    @Column({type: "varchar", length: 2000})
    question!: string;

    @Column({type: "enum", enum: QuestionsStatus})
    status!: string;
}