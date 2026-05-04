import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { UpdateApplicationCommand } from '../commands/update-application.command';
import { UpdateApplicationDto } from '../dto/update-application.dto';

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async execute(command: UpdateApplicationCommand): Promise<Application | null> {
    const { id, updateApplicationDto } = command;
    await this.applicationRepository.update(id, updateApplicationDto);
    return this.applicationRepository.findOne({ where: { id } });
  }
}
