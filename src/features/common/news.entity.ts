import {BaseModel} from "../../core/base-model";
import {Column, ManyToOne} from "typeorm";
import {NewsCategoriesEntity} from "./newsCategories.entity";

export class NewsEntity extends BaseModel {
    @Column()
    categoryId!: number;

    @Column({type: "varchar", length: 256})
    title!: string;

    @Column({type: "varchar", length: 128})
    image!: string;

    @Column()
    date!: Date;

    @Column({type: "text"})
    content!: string

    @ManyToOne(() => NewsCategoriesEntity, (category) => category.id)
    categories?: NewsCategoriesEntity
}