import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';
import { AdminTagsController } from './admin-tags.controller';
import { PublicTagsController } from './public-tags.controller';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [AdminTagsController, PublicTagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
