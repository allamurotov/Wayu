import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';

@Injectable()
export class BookCategoriesService {
  constructor(
    @InjectRepository(BookCategory)
    private bookCategoriesRepository: Repository<BookCategory>,
  ) {}

  async create(createBookCategoryDto: CreateBookCategoryDto): Promise<BookCategory> {
    const bookCategory = this.bookCategoriesRepository.create(createBookCategoryDto);
    return this.bookCategoriesRepository.save(bookCategory);
  }

  async findAll(): Promise<BookCategory[]> {
    return this.bookCategoriesRepository.find();
  }

  async findOne(id: number): Promise<BookCategory | null> {
    return this.bookCategoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateBookCategoryDto: UpdateBookCategoryDto): Promise<BookCategory | null> {
    await this.bookCategoriesRepository.update(id, updateBookCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookCategoriesRepository.delete(id);
  }
}
