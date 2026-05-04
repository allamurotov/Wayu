import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NewsTag } from '../news-tags/entities/news-tag.entity';
import { FaqTag } from '../faq-tags/entities/faq-tag.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  color: string;

  @Column({ type: 'int', default: 0 })
  usageCount: number;

  @OneToMany(() => NewsTag, (newsTag) => newsTag.tag)
  newsTags: NewsTag[];

  @OneToMany(() => FaqTag, (faqTag) => faqTag.tag)
  faqTags: FaqTag[];
}
