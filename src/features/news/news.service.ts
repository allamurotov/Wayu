import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  create(createNewsDto: CreateNewsDto): Promise<News> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  findOne(id: number): Promise<News | null> {
    return this.newsRepository.findOne({ where: { id } });
  }

  update(id: number, updateNewsDto: UpdateNewsDto): Promise<News | null> {
    this.newsRepository.update(id, updateNewsDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.newsRepository.delete(id).then(() => {});
  }
}
