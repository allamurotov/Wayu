import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { CreateApplicationCommand } from '../commands/create-application.command';
import { CreateApplicationDto } from '../dto/create-application.dto';

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async execute(command: CreateApplicationCommand): Promise<Application> {
    const { createApplicationDto } = command;
    const application = this.applicationRepository.create(createApplicationDto);
    return this.applicationRepository.save(application);
  }
}
