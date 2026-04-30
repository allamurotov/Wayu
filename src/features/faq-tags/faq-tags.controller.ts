import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FaqTagsService } from './faq-tags.service';
import { FaqTag } from './entities/faq-tag.entity';

@ApiTags('faq-tags')
@Controller('faq-tags')
export class FaqTagsController {
  constructor(private readonly faqTagsService: FaqTagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create faq-tag relation' })
  @ApiResponse({ status: 201, description: 'Faq-tag relation created successfully', type: FaqTag })
  create(@Body() body: { faqId: number; tagId: number }) {
    return this.faqTagsService.create(body.faqId, body.tagId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faq-tag relations' })
  @ApiResponse({ status: 200, description: 'Faq-tag relations retrieved successfully', type: [FaqTag] })
  findAll() {
    return this.faqTagsService.findAll();
  }

  @Get('faq/:faqId')
  @ApiOperation({ summary: 'Get tags by FAQ ID' })
  @ApiResponse({ status: 200, description: 'Tags retrieved successfully', type: [FaqTag] })
  findByFaq(@Param('faqId') faqId: string) {
    return this.faqTagsService.findByFaq(+faqId);
  }

  @Get('tag/:tagId')
  @ApiOperation({ summary: 'Get FAQs by tag ID' })
  @ApiResponse({ status: 200, description: 'FAQs retrieved successfully', type: [FaqTag] })
  findByTag(@Param('tagId') tagId: string) {
    return this.faqTagsService.findByTag(+tagId);
  }

  @Get('faq/:faqId/tag/:tagId')
  @ApiOperation({ summary: 'Get specific faq-tag relation' })
  @ApiResponse({ status: 200, description: 'Faq-tag relation retrieved successfully', type: FaqTag })
  findOne(@Param('faqId') faqId: string, @Param('tagId') tagId: string) {
    return this.faqTagsService.findOne(+faqId, +tagId);
  }

  @Delete('faq/:faqId/tag/:tagId')
  @ApiOperation({ summary: 'Delete specific faq-tag relation' })
  @ApiResponse({ status: 200, description: 'Faq-tag relation deleted successfully' })
  remove(@Param('faqId') faqId: string, @Param('tagId') tagId: string) {
    return this.faqTagsService.remove(+faqId, +tagId);
  }
}
