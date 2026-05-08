import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('eventCategories')
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;
}
