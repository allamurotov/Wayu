import { UpdateVacancyDto } from '../dto/update-vacancy.dto';

export class UpdateVacancyCommand {
  constructor(public readonly id: number, public readonly updateVacancyDto: UpdateVacancyDto) {}
}
