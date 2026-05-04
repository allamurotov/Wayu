import { Controller, Get, Param } from '@nestjs/common';
import { UsefulLinksService } from './useful-links.service';

@Controller('public/useful-links')
export class PublicUsefulLinksController {
  constructor(private readonly usefulLinksService: UsefulLinksService) {}

  @Get()
  findAll() {
    return this.usefulLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usefulLinksService.findOne(+id);
  }
}
