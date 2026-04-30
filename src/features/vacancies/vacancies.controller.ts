import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  @ApiOperation({ summary: 'Create vacancy' })
  @ApiResponse({ status: 201, description: 'Vacancy created successfully', type: Vacancy })
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vacancies' })
  @ApiResponse({ status: 200, description: 'Vacancies retrieved successfully', type: [Vacancy] })
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  @ApiResponse({ status: 200, description: 'Vacancy retrieved successfully', type: Vacancy })
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy updated successfully', type: Vacancy })
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacanciesService.update(+id, updateVacancyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete vacancy' })
  @ApiResponse({ status: 200, description: 'Vacancy deleted successfully' })
  remove(@Param('id') id: string) {
    return this.vacanciesService.remove(+id);
  }
}
