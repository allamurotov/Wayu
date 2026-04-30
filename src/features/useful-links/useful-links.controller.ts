import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsefulLinksService } from './useful-links.service';
import { CreateUsefulLinkDto } from './dto/create-useful-link.dto';
import { UpdateUsefulLinkDto } from './dto/update-useful-link.dto';
import { UsefulLink } from './entities/useful-link.entity';

@ApiTags('useful-links')
@Controller('useful-links')
export class UsefulLinksController {
  constructor(private readonly usefulLinksService: UsefulLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create useful link' })
  @ApiResponse({ status: 201, description: 'Useful link created successfully', type: UsefulLink })
  create(@Body() createUsefulLinkDto: CreateUsefulLinkDto) {
    return this.usefulLinksService.create(createUsefulLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all useful links' })
  @ApiResponse({ status: 200, description: 'Useful links retrieved successfully', type: [UsefulLink] })
  findAll() {
    return this.usefulLinksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get useful link by ID' })
  @ApiResponse({ status: 200, description: 'Useful link retrieved successfully', type: UsefulLink })
  findOne(@Param('id') id: string) {
    return this.usefulLinksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update useful link' })
  @ApiResponse({ status: 200, description: 'Useful link updated successfully', type: UsefulLink })
  update(@Param('id') id: string, @Body() updateUsefulLinkDto: UpdateUsefulLinkDto) {
    return this.usefulLinksService.update(+id, updateUsefulLinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete useful link' })
  @ApiResponse({ status: 200, description: 'Useful link deleted successfully' })
  remove(@Param('id') id: string) {
    return this.usefulLinksService.remove(+id);
  }
}
