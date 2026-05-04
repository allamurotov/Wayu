import { Controller, Get, Param } from '@nestjs/common';
import { FaqsService } from './faqs.service';

@Controller('public/faqs')
export class PublicFaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(+id);
  }
}
