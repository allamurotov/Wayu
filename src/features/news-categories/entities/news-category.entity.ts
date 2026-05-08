import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('newsCategories')
export class NewsCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;
}
