import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../books/entities/book.entity';

@Entity('bookCategories')
export class BookCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  title: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
