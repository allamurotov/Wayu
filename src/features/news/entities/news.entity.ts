import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { NewsCategory } from '../news-categories/entities/news-category.entity';
import { Country } from '../countries/entities/country.entity';
import { NewsTag } from '../news-tags/entities/news-tag.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  categoryId: number;

  @Column({ nullable: true })
  @Index()
  countryId: number;

  @Column({ type: 'varchar', length: 256 })
  @Index()
  title: string;

  @Column({ type: 'varchar', length: 128 })
  image: string;

  @Column({ type: 'date' })
  @Index()
  date: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => NewsCategory, (category) => category.news)
  category: NewsCategory;

  @ManyToOne(() => Country, (country) => country.news)
  country: Country;

  @OneToMany(() => NewsTag, (newsTag) => newsTag.news)
  newsTags: NewsTag[];
}
