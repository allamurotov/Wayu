import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { GetVacanciesQuery } from '../queries/get-vacancies.query';

@QueryHandler(GetVacanciesQuery)
export class GetVacanciesHandler implements IQueryHandler<GetVacanciesQuery> {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async execute(): Promise<Vacancy[]> {
    return this.vacancyRepository.find();
  }
}
