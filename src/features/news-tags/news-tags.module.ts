import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsTagsService } from './news-tags.service';
import { NewsTagsController } from './news-tags.controller';
import { NewsTag } from './entities/news-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsTag])],
  controllers: [NewsTagsController],
  providers: [NewsTagsService],
  exports: [NewsTagsService],
})
export class NewsTagsModule {}
