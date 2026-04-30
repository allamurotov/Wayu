import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookCategoriesService } from './book-categories.service';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { BookCategory } from './entities/book-category.entity';

@ApiTags('book-categories')
@Controller('book-categories')
export class BookCategoriesController {
  constructor(private readonly bookCategoriesService: BookCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create book category' })
  @ApiResponse({ status: 201, description: 'Book category created successfully', type: BookCategory })
  create(@Body() createBookCategoryDto: CreateBookCategoryDto) {
    return this.bookCategoriesService.create(createBookCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all book categories' })
  @ApiResponse({ status: 200, description: 'Book categories retrieved successfully', type: [BookCategory] })
  findAll() {
    return this.bookCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book category by ID' })
  @ApiResponse({ status: 200, description: 'Book category retrieved successfully', type: BookCategory })
  findOne(@Param('id') id: string) {
    return this.bookCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book category' })
  @ApiResponse({ status: 200, description: 'Book category updated successfully', type: BookCategory })
  update(@Param('id') id: string, @Body() updateBookCategoryDto: UpdateBookCategoryDto) {
    return this.bookCategoriesService.update(+id, updateBookCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book category' })
  @ApiResponse({ status: 200, description: 'Book category deleted successfully' })
  remove(@Param('id') id: string) {
    return this.bookCategoriesService.remove(+id);
  }
}
