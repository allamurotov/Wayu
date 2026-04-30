import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsTag } from './entities/news-tag.entity';

@Injectable()
export class NewsTagsService {
  constructor(
    @InjectRepository(NewsTag)
    private newsTagsRepository: Repository<NewsTag>,
  ) {}

  async create(newsId: number, tagId: number): Promise<NewsTag> {
    const newsTag = this.newsTagsRepository.create({ newsId, tagId });
    return this.newsTagsRepository.save(newsTag);
  }

  async findAll(): Promise<NewsTag[]> {
    return this.newsTagsRepository.find({ relations: ['news', 'tag'] });
  }

  async findByNews(newsId: number): Promise<NewsTag[]> {
    return this.newsTagsRepository.find({ 
      where: { newsId }, 
      relations: ['news', 'tag'] 
    });
  }

  async findByTag(tagId: number): Promise<NewsTag[]> {
    return this.newsTagsRepository.find({ 
      where: { tagId }, 
      relations: ['news', 'tag'] 
    });
  }

  async findOne(newsId: number, tagId: number): Promise<NewsTag> {
    return this.newsTagsRepository.findOne({ 
      where: { newsId, tagId }, 
      relations: ['news', 'tag'] 
    });
  }

  async remove(newsId: number, tagId: number): Promise<void> {
    await this.newsTagsRepository.delete({ newsId, tagId });
  }
}
