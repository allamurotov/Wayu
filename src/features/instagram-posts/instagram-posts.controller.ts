import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InstagramPostsService } from './instagram-posts.service';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';
import { UpdateInstagramPostDto } from './dto/update-instagram-post.dto';
import { InstagramPost } from './entities/instagram-post.entity';

@ApiTags('instagram-posts')
@Controller('instagram-posts')
export class InstagramPostsController {
  constructor(private readonly instagramPostsService: InstagramPostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Instagram post' })
  @ApiResponse({ status: 201, description: 'Instagram post created successfully', type: InstagramPost })
  create(@Body() createInstagramPostDto: CreateInstagramPostDto) {
    return this.instagramPostsService.create(createInstagramPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Instagram posts' })
  @ApiResponse({ status: 200, description: 'Instagram posts retrieved successfully', type: [InstagramPost] })
  findAll() {
    return this.instagramPostsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Instagram post by ID' })
  @ApiResponse({ status: 200, description: 'Instagram post retrieved successfully', type: InstagramPost })
  findOne(@Param('id') id: string) {
    return this.instagramPostsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Instagram post' })
  @ApiResponse({ status: 200, description: 'Instagram post updated successfully', type: InstagramPost })
  update(@Param('id') id: string, @Body() updateInstagramPostDto: UpdateInstagramPostDto) {
    return this.instagramPostsService.update(+id, updateInstagramPostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Instagram post' })
  @ApiResponse({ status: 200, description: 'Instagram post deleted successfully' })
  remove(@Param('id') id: string) {
    return this.instagramPostsService.remove(+id);
  }
}
