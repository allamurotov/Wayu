import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { News } from '../news/entities/news.entity';

@Entity('newsCategories')
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @OneToMany(() => News, (news) => news.category)
  news: News[];
}
