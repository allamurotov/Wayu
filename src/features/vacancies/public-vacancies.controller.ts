import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetVacanciesQuery } from './queries/get-vacancies.query';
import { GetVacancyByIdQuery } from './queries/get-vacancy-by-id.query';

@Controller('public/vacancies')
export class PublicVacanciesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetVacanciesQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetVacancyByIdQuery(+id));
  }
}
