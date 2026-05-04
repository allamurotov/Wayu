import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from '../entities/static-info.entity';
import { DeleteStaticInfoCommand } from '../commands/delete-static-info.command';

@CommandHandler(DeleteStaticInfoCommand)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoCommand> {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async execute(command: DeleteStaticInfoCommand): Promise<void> {
    const { id } = command;
    await this.staticInfoRepository.delete(id);
  }
}
