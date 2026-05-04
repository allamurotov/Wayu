import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { DeleteNewsCommand } from '../commands/delete-news.command';

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async execute(command: DeleteNewsCommand): Promise<void> {
    const { id } = command;
    await this.newsRepository.delete(id);
  }
}
