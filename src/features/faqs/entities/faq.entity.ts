import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FaqTag } from '../faq-tags/entities/faq-tag.entity';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  question: string;

  @Column({ type: 'varchar', length: 512 })
  answer: string;

  @OneToMany(() => FaqTag, (faqTag) => faqTag.faq)
  faqTags: FaqTag[];
}
