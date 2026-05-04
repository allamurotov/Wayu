import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { UpdateNewsCommand } from '../commands/update-news.command';
import { UpdateNewsDto } from '../dto/update-news.dto';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async execute(command: UpdateNewsCommand): Promise<News | null> {
    const { id, updateNewsDto } = command;
    await this.newsRepository.update(id, updateNewsDto);
    return this.newsRepository.findOne({ where: { id } });
  }
}
