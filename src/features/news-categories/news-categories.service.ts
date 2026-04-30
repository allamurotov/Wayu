import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsCategory } from './entities/news-category.entity';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';

@Injectable()
export class NewsCategoriesService {
  constructor(
    @InjectRepository(NewsCategory)
    private newsCategoriesRepository: Repository<NewsCategory>,
  ) {}

  async create(createNewsCategoryDto: CreateNewsCategoryDto): Promise<NewsCategory> {
    const newsCategory = this.newsCategoriesRepository.create(createNewsCategoryDto);
    return this.newsCategoriesRepository.save(newsCategory);
  }

  async findAll(): Promise<NewsCategory[]> {
    return this.newsCategoriesRepository.find();
  }

  async findOne(id: number): Promise<NewsCategory> {
    return this.newsCategoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateNewsCategoryDto: UpdateNewsCategoryDto): Promise<NewsCategory> {
    await this.newsCategoriesRepository.update(id, updateNewsCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.newsCategoriesRepository.delete(id);
  }
}
