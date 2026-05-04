import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateApplicationCommand } from './commands/create-application.command';
import { UpdateApplicationCommand } from './commands/update-application.command';
import { DeleteApplicationCommand } from './commands/delete-application.command';
import { GetApplicationsQuery } from './queries/get-applications.query';
import { GetApplicationByIdQuery } from './queries/get-application-by-id.query';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('admin/applications')
export class AdminApplicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.commandBus.execute(new CreateApplicationCommand(createApplicationDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetApplicationsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetApplicationByIdQuery(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.commandBus.execute(new UpdateApplicationCommand(+id, updateApplicationDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteApplicationCommand(+id));
  }
}
