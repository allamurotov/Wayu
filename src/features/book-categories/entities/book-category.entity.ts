import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bookCategories')
export class BookCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;
}
