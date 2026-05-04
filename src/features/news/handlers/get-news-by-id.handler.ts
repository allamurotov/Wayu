import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { GetNewsByIdQuery } from '../queries/get-news-by-id.query';

@QueryHandler(GetNewsByIdQuery)
export class GetNewsByIdHandler implements IQueryHandler<GetNewsByIdQuery> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async execute(query: GetNewsByIdQuery): Promise<News | null> {
    const { id } = query;
    return this.newsRepository.findOne({ where: { id } });
  }
}
