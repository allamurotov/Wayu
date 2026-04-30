import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RepresentativesService } from './representatives.service';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { Representative } from './entities/representative.entity';

@ApiTags('representatives')
@Controller('representatives')
export class RepresentativesController {
  constructor(private readonly representativesService: RepresentativesService) {}

  @Post()
  @ApiOperation({ summary: 'Create representative' })
  @ApiResponse({ status: 201, description: 'Representative created successfully', type: Representative })
  create(@Body() createRepresentativeDto: CreateRepresentativeDto) {
    return this.representativesService.create(createRepresentativeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all representatives' })
  @ApiResponse({ status: 200, description: 'Representatives retrieved successfully', type: [Representative] })
  findAll() {
    return this.representativesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get representative by ID' })
  @ApiResponse({ status: 200, description: 'Representative retrieved successfully', type: Representative })
  findOne(@Param('id') id: string) {
    return this.representativesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update representative' })
  @ApiResponse({ status: 200, description: 'Representative updated successfully', type: Representative })
  update(@Param('id') id: string, @Body() updateRepresentativeDto: UpdateRepresentativeDto) {
    return this.representativesService.update(+id, updateRepresentativeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete representative' })
  @ApiResponse({ status: 200, description: 'Representative deleted successfully' })
  remove(@Param('id') id: string) {
    return this.representativesService.remove(+id);
  }
}
