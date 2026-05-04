import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find({ 
      relations: ['news', 'faqs'] 
    });
  }

  async findOne(id: number): Promise<Tag | null> {
    return this.tagsRepository.findOne({ 
      where: { id }, 
      relations: ['news', 'faqs'] 
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    await this.tagsRepository.update(id, updateTagDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tagsRepository.delete(id);
  }
}
