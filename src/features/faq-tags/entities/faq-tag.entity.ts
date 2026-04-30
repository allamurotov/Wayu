import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Faq } from '../faqs/entities/faq.entity';
import { Tag } from '../tags/entities/tag.entity';

@Entity('faqsTags')
export class FaqTag {
  @PrimaryColumn()
  faqId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => Faq, (faq) => faq.faqTags)
  faq: Faq;

  @ManyToOne(() => Tag, (tag) => tag.faqTags)
  tag: Tag;
}
