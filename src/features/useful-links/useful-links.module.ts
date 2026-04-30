import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsefulLinksService } from './useful-links.service';
import { UsefulLinksController } from './useful-links.controller';
import { UsefulLink } from './entities/useful-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsefulLink])],
  controllers: [UsefulLinksController],
  providers: [UsefulLinksService],
  exports: [UsefulLinksService],
})
export class UsefulLinksModule {}
