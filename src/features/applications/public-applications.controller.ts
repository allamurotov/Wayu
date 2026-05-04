import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetApplicationsQuery } from './queries/get-applications.query';
import { GetApplicationByIdQuery } from './queries/get-application-by-id.query';

@Controller('public/applications')
export class PublicApplicationsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetApplicationsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetApplicationByIdQuery(+id));
  }
}
