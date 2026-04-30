import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsCategoriesService } from './news-categories.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
import { NewsCategory } from './entities/news-category.entity';

@ApiTags('news-categories')
@Controller('news-categories')
export class NewsCategoriesController {
  constructor(private readonly newsCategoriesService: NewsCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create news category' })
  @ApiResponse({ status: 201, description: 'News category created successfully', type: NewsCategory })
  create(@Body() createNewsCategoryDto: CreateNewsCategoryDto) {
    return this.newsCategoriesService.create(createNewsCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news categories' })
  @ApiResponse({ status: 200, description: 'News categories retrieved successfully', type: [NewsCategory] })
  findAll() {
    return this.newsCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news category by ID' })
  @ApiResponse({ status: 200, description: 'News category retrieved successfully', type: NewsCategory })
  findOne(@Param('id') id: string) {
    return this.newsCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news category' })
  @ApiResponse({ status: 200, description: 'News category updated successfully', type: NewsCategory })
  update(@Param('id') id: string, @Body() updateNewsCategoryDto: UpdateNewsCategoryDto) {
    return this.newsCategoriesService.update(+id, updateNewsCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news category' })
  @ApiResponse({ status: 200, description: 'News category deleted successfully' })
  remove(@Param('id') id: string) {
    return this.newsCategoriesService.remove(+id);
  }
}
