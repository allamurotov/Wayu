import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { GetApplicationByIdQuery } from '../queries/get-application-by-id.query';

@QueryHandler(GetApplicationByIdQuery)
export class GetApplicationByIdHandler implements IQueryHandler<GetApplicationByIdQuery> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async execute(query: GetApplicationByIdQuery): Promise<Application | null> {
    const { id } = query;
    return this.applicationRepository.findOne({ where: { id } });
  }
}
