import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetStaticInfoQuery } from './queries/get-static-info.query';
import { GetStaticInfoByIdQuery } from './queries/get-static-info-by-id.query';

@Controller('public/static-info')
export class PublicStaticInfoController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetStaticInfoQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetStaticInfoByIdQuery(+id));
  }
}
