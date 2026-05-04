import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticInfoService } from './static-info.service';
import { CreateStaticInfoDto } from './dto/create-static-info.dto';
import { UpdateStaticInfoDto } from './dto/update-static-info.dto';

@Controller('static-info')
export class StaticInfoController {
  constructor(private readonly staticInfoService: StaticInfoService) {}

  @Post()
  create(@Body() createStaticInfoDto: CreateStaticInfoDto) {
    return this.staticInfoService.create(createStaticInfoDto);
  }

  @Get()
  findAll() {
    return this.staticInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticInfoDto: UpdateStaticInfoDto) {
    return this.staticInfoService.update(+id, updateStaticInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticInfoService.remove(+id);
  }
}
