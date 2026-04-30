import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@ApiTags('languages')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create language' })
  @ApiResponse({ status: 201, description: 'Language created successfully', type: Language })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all languages' })
  @ApiResponse({ status: 200, description: 'Languages retrieved successfully', type: [Language] })
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get language by ID' })
  @ApiResponse({ status: 200, description: 'Language retrieved successfully', type: Language })
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update language' })
  @ApiResponse({ status: 200, description: 'Language updated successfully', type: Language })
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete language' })
  @ApiResponse({ status: 200, description: 'Language deleted successfully' })
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }
}
