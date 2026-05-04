import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { GetNewsQuery } from '../queries/get-news.query';

@QueryHandler(GetNewsQuery)
export class GetNewsHandler implements IQueryHandler<GetNewsQuery> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async execute(): Promise<News[]> {
    return this.newsRepository.find();
  }
}
