import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsefulLinksService } from './useful-links.service';
import { AdminUsefulLinksController } from './admin-useful-links.controller';
import { PublicUsefulLinksController } from './public-useful-links.controller';
import { UsefulLink } from './entities/useful-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsefulLink])],
  controllers: [AdminUsefulLinksController, PublicUsefulLinksController],
  providers: [UsefulLinksService],
  exports: [UsefulLinksService],
})
export class UsefulLinksModule {}
