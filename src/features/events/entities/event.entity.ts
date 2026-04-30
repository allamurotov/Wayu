import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventCategory } from '../event-categories/entities/event-category.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 128 })
  image: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar', length: 128 })
  address: string;

  @ManyToOne(() => EventCategory, (category) => category.events)
  category: EventCategory;
}
