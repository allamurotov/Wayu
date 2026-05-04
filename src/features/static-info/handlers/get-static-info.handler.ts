import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from '../entities/static-info.entity';
import { GetStaticInfoQuery } from '../queries/get-static-info.query';

@QueryHandler(GetStaticInfoQuery)
export class GetStaticInfoHandler implements IQueryHandler<GetStaticInfoQuery> {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async execute(): Promise<StaticInfo[]> {
    return this.staticInfoRepository.find();
  }
}
