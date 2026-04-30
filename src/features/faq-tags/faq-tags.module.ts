import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqTagsService } from './faq-tags.service';
import { FaqTagsController } from './faq-tags.controller';
import { FaqTag } from './entities/faq-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FaqTag])],
  controllers: [FaqTagsController],
  providers: [FaqTagsService],
  exports: [FaqTagsService],
})
export class FaqTagsModule {}
