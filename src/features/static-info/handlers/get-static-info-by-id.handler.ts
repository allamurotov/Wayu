import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from '../entities/static-info.entity';
import { GetStaticInfoByIdQuery } from '../queries/get-static-info-by-id.query';

@QueryHandler(GetStaticInfoByIdQuery)
export class GetStaticInfoByIdHandler implements IQueryHandler<GetStaticInfoByIdQuery> {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async execute(query: GetStaticInfoByIdQuery): Promise<StaticInfo | null> {
    const { id } = query;
    return this.staticInfoRepository.findOne({ where: { id } });
  }
}
