import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetNewsQuery } from './queries/get-news.query';
import { GetNewsByIdQuery } from './queries/get-news-by-id.query';

@Controller('public/news')
export class PublicNewsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  findAll() {
    return this.queryBus.execute(new GetNewsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetNewsByIdQuery(+id));
  }
}
