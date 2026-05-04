import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { GetCountryByIdQuery } from '../queries/get-country-by-id.query';

@QueryHandler(GetCountryByIdQuery)
export class GetCountryByIdHandler implements IQueryHandler<GetCountryByIdQuery> {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async execute(query: GetCountryByIdQuery): Promise<Country | null> {
    const { id } = query;
    return this.countryRepository.findOne({ where: { id } });
  }
}
