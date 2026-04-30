import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsTagsService } from './news-tags.service';
import { NewsTag } from './entities/news-tag.entity';

@ApiTags('news-tags')
@Controller('news-tags')
export class NewsTagsController {
  constructor(private readonly newsTagsService: NewsTagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create news-tag relation' })
  @ApiResponse({ status: 201, description: 'News-tag relation created successfully', type: NewsTag })
  create(@Body() body: { newsId: number; tagId: number }) {
    return this.newsTagsService.create(body.newsId, body.tagId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news-tag relations' })
  @ApiResponse({ status: 200, description: 'News-tag relations retrieved successfully', type: [NewsTag] })
  findAll() {
    return this.newsTagsService.findAll();
  }

  @Get('news/:newsId')
  @ApiOperation({ summary: 'Get tags by news ID' })
  @ApiResponse({ status: 200, description: 'Tags retrieved successfully', type: [NewsTag] })
  findByNews(@Param('newsId') newsId: string) {
    return this.newsTagsService.findByNews(+newsId);
  }

  @Get('tag/:tagId')
  @ApiOperation({ summary: 'Get news by tag ID' })
  @ApiResponse({ status: 200, description: 'News retrieved successfully', type: [NewsTag] })
  findByTag(@Param('tagId') tagId: string) {
    return this.newsTagsService.findByTag(+tagId);
  }

  @Get('news/:newsId/tag/:tagId')
  @ApiOperation({ summary: 'Get specific news-tag relation' })
  @ApiResponse({ status: 200, description: 'News-tag relation retrieved successfully', type: NewsTag })
  findOne(@Param('newsId') newsId: string, @Param('tagId') tagId: string) {
    return this.newsTagsService.findOne(+newsId, +tagId);
  }

  @Delete('news/:newsId/tag/:tagId')
  @ApiOperation({ summary: 'Delete specific news-tag relation' })
  @ApiResponse({ status: 200, description: 'News-tag relation deleted successfully' })
  remove(@Param('newsId') newsId: string, @Param('tagId') tagId: string) {
    return this.newsTagsService.remove(+newsId, +tagId);
  }
}
