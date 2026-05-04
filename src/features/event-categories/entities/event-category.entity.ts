import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('eventCategories')
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
