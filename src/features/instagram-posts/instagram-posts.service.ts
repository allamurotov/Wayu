import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstagramPost } from './entities/instagram-post.entity';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';
import { UpdateInstagramPostDto } from './dto/update-instagram-post.dto';

@Injectable()
export class InstagramPostsService {
  constructor(
    @InjectRepository(InstagramPost)
    private instagramPostsRepository: Repository<InstagramPost>,
  ) {}

  async create(createInstagramPostDto: CreateInstagramPostDto): Promise<InstagramPost> {
    const instagramPost = this.instagramPostsRepository.create(createInstagramPostDto);
    return this.instagramPostsRepository.save(instagramPost);
  }

  async findAll(): Promise<InstagramPost[]> {
    return this.instagramPostsRepository.find();
  }

  async findOne(id: number): Promise<InstagramPost> {
    return this.instagramPostsRepository.findOneBy({ id });
  }

  async update(id: number, updateInstagramPostDto: UpdateInstagramPostDto): Promise<InstagramPost> {
    await this.instagramPostsRepository.update(id, updateInstagramPostDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.instagramPostsRepository.delete(id);
  }
}
