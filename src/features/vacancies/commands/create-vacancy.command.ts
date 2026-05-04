import { CreateVacancyDto } from '../dto/create-vacancy.dto';

export class CreateVacancyCommand {
  constructor(public readonly createVacancyDto: CreateVacancyDto) {}
}
