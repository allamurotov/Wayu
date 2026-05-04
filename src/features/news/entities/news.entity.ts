import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { NewsCategory } from '../news-categories/entities/news-category.entity';
import { Country } from '../countries/entities/country.entity';
import { NewsTag } from '../news-tags/entities/news-tag.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  countryId: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  image: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  author: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @ManyToOne(() => NewsCategory, (category) => category.news)
  category: NewsCategory;

  @ManyToOne(() => Country, (country) => country.news)
  country: Country;

  @OneToMany(() => NewsTag, (newsTag) => newsTag.news)
  newsTags: NewsTag[];
}
