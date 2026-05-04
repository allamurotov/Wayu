import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLinksService } from './social-links.service';
import { AdminSocialLinksController } from './admin-social-links.controller';
import { PublicSocialLinksController } from './public-social-links.controller';
import { SocialLink } from './entities/social-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLink])],
  controllers: [AdminSocialLinksController, PublicSocialLinksController],
  providers: [SocialLinksService],
  exports: [SocialLinksService],
})
export class SocialLinksModule {}
