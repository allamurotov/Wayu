import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { CreateNewsCommand } from '../commands/create-news.command';
import { CreateNewsDto } from '../dto/create-news.dto';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async execute(command: CreateNewsCommand): Promise<News> {
    const { createNewsDto } = command;
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }
}
