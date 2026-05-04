import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { News } from '../../news/entities/news.entity';
import { Faq } from '../../faqs/entities/faq.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @ManyToMany(() => News, (news) => news.tags)
  news: News[];

  @ManyToMany(() => Faq, (faq) => faq.tags)
  faqs: Faq[];
}
