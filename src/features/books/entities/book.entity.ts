import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { BookCategory } from '../../book-categories/entities/book-category.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  categoryId: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 128 })
  image: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 256 })
  file: string;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => BookCategory, (category) => category.books)
  category: BookCategory;
}
