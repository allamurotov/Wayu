import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateVacancyCommand } from './commands/create-vacancy.command';
import { UpdateVacancyCommand } from './commands/update-vacancy.command';
import { DeleteVacancyCommand } from './commands/delete-vacancy.command';
import { GetVacanciesQuery } from './queries/get-vacancies.query';
import { GetVacancyByIdQuery } from './queries/get-vacancy-by-id.query';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Controller('admin/vacancies')
export class AdminVacanciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.commandBus.execute(new CreateVacancyCommand(createVacancyDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetVacanciesQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetVacancyByIdQuery(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.commandBus.execute(new UpdateVacancyCommand(+id, updateVacancyDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteVacancyCommand(+id));
  }
}
