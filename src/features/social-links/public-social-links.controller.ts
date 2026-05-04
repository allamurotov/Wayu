import { Controller, Get, Param } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';

@Controller('public/social-links')
export class PublicSocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  findAll() {
    return this.socialLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialLinksService.findOne(+id);
  }
}
