import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from '../entities/static-info.entity';
import { CreateStaticInfoCommand } from '../commands/create-static-info.command';
import { CreateStaticInfoDto } from '../dto/create-static-info.dto';

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async execute(command: CreateStaticInfoCommand): Promise<StaticInfo> {
    const { createStaticInfoDto } = command;
    const staticInfo = this.staticInfoRepository.create(createStaticInfoDto);
    return this.staticInfoRepository.save(staticInfo);
  }
}
