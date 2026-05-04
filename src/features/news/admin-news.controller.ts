import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewsCommand } from './commands/create-news.command';
import { UpdateNewsCommand } from './commands/update-news.command';
import { DeleteNewsCommand } from './commands/delete-news.command';
import { GetNewsQuery } from './queries/get-news.query';
import { GetNewsByIdQuery } from './queries/get-news-by-id.query';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('admin/news')
export class AdminNewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.commandBus.execute(new CreateNewsCommand(createNewsDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetNewsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetNewsByIdQuery(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.commandBus.execute(new UpdateNewsCommand(+id, updateNewsDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteNewsCommand(+id));
  }
}
