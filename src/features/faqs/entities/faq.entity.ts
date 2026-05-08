import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('faqs')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  question: string;

  @Column({ type: 'varchar', length: 512 })
  answer: string;
}
