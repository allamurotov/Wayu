import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import { BookCategory } from '../book-categories/entities/book-category.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  categoryId: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  coverImage: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'varchar', length: 200 })
  pdfFile: string;

  @Column({ type: 'int' })
  pageCount: number;

  @Column({ type: 'int' })
  publishYear: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  isbn: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  publisher: string;

  @Column({ type: 'int', default: 0 })
  downloads: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => BookCategory, (category) => category.books)
  category: BookCategory;
}
