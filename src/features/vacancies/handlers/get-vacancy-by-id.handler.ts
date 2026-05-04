import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from '../entities/vacancy.entity';
import { GetVacancyByIdQuery } from '../queries/get-vacancy-by-id.query';

@QueryHandler(GetVacancyByIdQuery)
export class GetVacancyByIdHandler implements IQueryHandler<GetVacancyByIdQuery> {
  constructor(
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {}

  async execute(query: GetVacancyByIdQuery): Promise<Vacancy | null> {
    const { id } = query;
    return this.vacancyRepository.findOne({ where: { id } });
  }
}
