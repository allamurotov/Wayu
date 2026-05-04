import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateStaticInfoCommand } from './commands/create-static-info.command';
import { UpdateStaticInfoCommand } from './commands/update-static-info.command';
import { DeleteStaticInfoCommand } from './commands/delete-static-info.command';
import { GetStaticInfoQuery } from './queries/get-static-info.query';
import { GetStaticInfoByIdQuery } from './queries/get-static-info-by-id.query';
import { CreateStaticInfoDto } from './dto/create-static-info.dto';
import { UpdateStaticInfoDto } from './dto/update-static-info.dto';

@Controller('admin/static-info')
export class AdminStaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createStaticInfoDto: CreateStaticInfoDto) {
    return this.commandBus.execute(new CreateStaticInfoCommand(createStaticInfoDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetStaticInfoQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetStaticInfoByIdQuery(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticInfoDto: UpdateStaticInfoDto) {
    return this.commandBus.execute(new UpdateStaticInfoCommand(+id, updateStaticInfoDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteStaticInfoCommand(+id));
  }
}
