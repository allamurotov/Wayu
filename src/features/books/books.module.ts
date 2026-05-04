import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { AdminBooksController } from './admin-books.controller';
import { PublicBooksController } from './public-books.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [AdminBooksController, PublicBooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
