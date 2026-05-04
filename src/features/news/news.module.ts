import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { News } from './entities/news.entity';
import { AdminNewsController } from './admin-news.controller';
import { PublicNewsController } from './public-news.controller';
import { CreateNewsHandler } from './handlers/create-news.handler';
import { UpdateNewsHandler } from './handlers/update-news.handler';
import { DeleteNewsHandler } from './handlers/delete-news.handler';
import { GetNewsHandler } from './handlers/get-news.handler';
import { GetNewsByIdHandler } from './handlers/get-news-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([News]), CqrsModule],
  controllers: [AdminNewsController, PublicNewsController],
  providers: [
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    GetNewsHandler,
    GetNewsByIdHandler,
  ],
})
export class NewsModule {}
