import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { NewsCategory } from '../../news-categories/entities/news-category.entity';
import { Country } from '../../countries/entities/country.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ nullable: true })
  countryId: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 128 })
  image: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => NewsCategory, (category) => category.news)
  category: NewsCategory;

  @ManyToOne(() => Country, (country) => country.news)
  country: Country;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'newsTags',
    joinColumn: { name: 'newsId' },
    inverseJoinColumn: { name: 'tagId' },
  })
  tags: Tag[];
}
