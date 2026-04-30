import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaticInfoService } from './static-info.service';
import { CreateStaticInfoDto } from './dto/create-static-info.dto';
import { UpdateStaticInfoDto } from './dto/update-static-info.dto';
import { StaticInfo } from './entities/static-info.entity';

@ApiTags('static-info')
@Controller('static-info')
export class StaticInfoController {
  constructor(private readonly staticInfoService: StaticInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Create static info' })
  @ApiResponse({ status: 201, description: 'Static info created successfully', type: StaticInfo })
  create(@Body() createStaticInfoDto: CreateStaticInfoDto) {
    return this.staticInfoService.create(createStaticInfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all static info' })
  @ApiResponse({ status: 200, description: 'Static info retrieved successfully', type: [StaticInfo] })
  findAll() {
    return this.staticInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get static info by ID' })
  @ApiResponse({ status: 200, description: 'Static info retrieved successfully', type: StaticInfo })
  findOne(@Param('id') id: string) {
    return this.staticInfoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update static info' })
  @ApiResponse({ status: 200, description: 'Static info updated successfully', type: StaticInfo })
  update(@Param('id') id: string, @Body() updateStaticInfoDto: UpdateStaticInfoDto) {
    return this.staticInfoService.update(+id, updateStaticInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete static info' })
  @ApiResponse({ status: 200, description: 'Static info deleted successfully' })
  remove(@Param('id') id: string) {
    return this.staticInfoService.remove(+id);
  }

  @Get('singleton')
  @ApiOperation({ summary: 'Get singleton static info' })
  @ApiResponse({ status: 200, description: 'Singleton static info retrieved successfully', type: StaticInfo })
  getSingleton() {
    return this.staticInfoService.getSingleton();
  }

  @Patch('singleton')
  @ApiOperation({ summary: 'Update singleton static info' })
  @ApiResponse({ status: 200, description: 'Singleton static info updated successfully', type: StaticInfo })
  updateSingleton(@Body() updateStaticInfoDto: UpdateStaticInfoDto) {
    return this.staticInfoService.updateSingleton(updateStaticInfoDto);
  }

  @Delete('singleton')
  @ApiOperation({ summary: 'Reset singleton static info' })
  @ApiResponse({ status: 200, description: 'Singleton static info reset successfully' })
  resetSingleton() {
    return this.staticInfoService.resetSingleton();
  }
}
