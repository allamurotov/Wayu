import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { CreateVacancyCommand } from '../commands/create-vacancy.command';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async execute(command: CreateVacancyCommand): Promise<Vacancy> {
    const { createVacancyDto } = command;
    const vacancy = this.vacancyRepository.create(createVacancyDto);
    return this.vacancyRepository.save(vacancy);
  }
}
