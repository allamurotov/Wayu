import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';
import { SocialLink } from './entities/social-link.entity';

@ApiTags('social-links')
@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create social link' })
  @ApiResponse({ status: 201, description: 'Social link created successfully', type: SocialLink })
  create(@Body() createSocialLinkDto: CreateSocialLinkDto) {
    return this.socialLinksService.create(createSocialLinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all social links' })
  @ApiResponse({ status: 200, description: 'Social links retrieved successfully', type: [SocialLink] })
  findAll() {
    return this.socialLinksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get social link by ID' })
  @ApiResponse({ status: 200, description: 'Social link retrieved successfully', type: SocialLink })
  findOne(@Param('id') id: string) {
    return this.socialLinksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update social link' })
  @ApiResponse({ status: 200, description: 'Social link updated successfully', type: SocialLink })
  update(@Param('id') id: string, @Body() updateSocialLinkDto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(+id, updateSocialLinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete social link' })
  @ApiResponse({ status: 200, description: 'Social link deleted successfully' })
  remove(@Param('id') id: string) {
    return this.socialLinksService.remove(+id);
  }
}
