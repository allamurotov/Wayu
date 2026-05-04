import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from '../entities/static-info.entity';
import { UpdateStaticInfoCommand } from '../commands/update-static-info.command';
import { UpdateStaticInfoDto } from '../dto/update-static-info.dto';

@CommandHandler(UpdateStaticInfoCommand)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoCommand> {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async execute(command: UpdateStaticInfoCommand): Promise<StaticInfo | null> {
    const { id, updateStaticInfoDto } = command;
    await this.staticInfoRepository.update(id, updateStaticInfoDto);
    return this.staticInfoRepository.findOne({ where: { id } });
  }
}
