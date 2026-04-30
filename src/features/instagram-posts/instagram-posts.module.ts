import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramPostsService } from './instagram-posts.service';
import { InstagramPostsController } from './instagram-posts.controller';
import { InstagramPost } from './entities/instagram-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstagramPost])],
  controllers: [InstagramPostsController],
  providers: [InstagramPostsService],
  exports: [InstagramPostsService],
})
export class InstagramPostsModule {}
