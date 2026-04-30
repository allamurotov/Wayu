import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { NewsTag } from '../news-tags/entities/news-tag.entity';
import { FaqTag } from '../faq-tags/entities/faq-tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  @Index()
  title: string;

  @OneToMany(() => NewsTag, (newsTag) => newsTag.tag)
  newsTags: NewsTag[];

  @OneToMany(() => FaqTag, (faqTag) => faqTag.tag)
  faqTags: FaqTag[];
}
