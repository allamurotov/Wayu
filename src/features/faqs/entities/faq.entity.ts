import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  question: string;

  @Column({ type: 'varchar', length: 512 })
  answer: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'faqsTags',
    joinColumn: { name: 'faqId' },
    inverseJoinColumn: { name: 'tagId' },
  })
  tags: Tag[];
}
