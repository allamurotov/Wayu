import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { GetApplicationsQuery } from '../queries/get-applications.query';

@QueryHandler(GetApplicationsQuery)
export class GetApplicationsHandler implements IQueryHandler<GetApplicationsQuery> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async execute(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
}
