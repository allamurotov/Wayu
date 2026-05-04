import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { DeleteVacancyCommand } from '../commands/delete-vacancy.command';

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async execute(command: DeleteVacancyCommand): Promise<void> {
    const { id } = command;
    await this.vacancyRepository.delete(id);
  }
}
