import {BaseModel} from "../../core/base-model";
import {ManyToOne} from "typeorm";
import {FaqsEntity} from "./faqs.entity";
import {TagsEntity} from "./tags.entity";

export class FaqsTagsEntity extends BaseModel {
    @ManyToOne(() => FaqsEntity, (faqs)=> faqs.id)
    faqs!: FaqsEntity;

    @ManyToOne(() => TagsEntity, (tags)=> tags.id)
    tags!: TagsEntity;
}