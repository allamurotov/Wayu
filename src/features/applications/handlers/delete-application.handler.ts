import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { DeleteApplicationCommand } from '../commands/delete-application.command';

@CommandHandler(DeleteApplicationCommand)
export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand> {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async execute(command: DeleteApplicationCommand): Promise<void> {
    const { id } = command;
    await this.applicationRepository.delete(id);
  }
}
