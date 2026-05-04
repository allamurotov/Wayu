import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('public/books')
export class PublicBooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }
}
