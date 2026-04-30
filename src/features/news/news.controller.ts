import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create news' })
  @ApiResponse({ status: 201, description: 'News created successfully', type: News })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  @ApiResponse({ status: 200, description: 'News retrieved successfully', type: [News] })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  @ApiResponse({ status: 200, description: 'News retrieved successfully', type: News })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news' })
  @ApiResponse({ status: 200, description: 'News updated successfully', type: News })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news' })
  @ApiResponse({ status: 200, description: 'News deleted successfully' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
