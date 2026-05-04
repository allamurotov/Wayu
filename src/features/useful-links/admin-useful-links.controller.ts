import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsefulLinksService } from './useful-links.service';
import { CreateUsefulLinkDto } from './dto/create-useful-link.dto';
import { UpdateUsefulLinkDto } from './dto/update-useful-link.dto';

@Controller('admin/useful-links')
export class AdminUsefulLinksController {
  constructor(private readonly usefulLinksService: UsefulLinksService) {}

  @Post()
  create(@Body() createUsefulLinkDto: CreateUsefulLinkDto) {
    return this.usefulLinksService.create(createUsefulLinkDto);
  }

  @Get()
  findAll() {
    return this.usefulLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usefulLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsefulLinkDto: UpdateUsefulLinkDto) {
    return this.usefulLinksService.update(+id, updateUsefulLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usefulLinksService.remove(+id);
  }
}
