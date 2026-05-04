import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { UpdateVacancyCommand } from '../commands/update-vacancy.command';
import { UpdateVacancyDto } from '../dto/update-vacancy.dto';

@CommandHandler(UpdateVacancyCommand)
export class UpdateVacancyHandler implements ICommandHandler<UpdateVacancyCommand> {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async execute(command: UpdateVacancyCommand): Promise<Vacancy | null> {
    const { id, updateVacancyDto } = command;
    await this.vacancyRepository.update(id, updateVacancyDto);
    return this.vacancyRepository.findOne({ where: { id } });
  }
}
