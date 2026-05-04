import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqsService } from './faqs.service';
import { AdminFaqsController } from './admin-faqs.controller';
import { PublicFaqsController } from './public-faqs.controller';
import { Faq } from './entities/faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  controllers: [AdminFaqsController, PublicFaqsController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqsModule {}
