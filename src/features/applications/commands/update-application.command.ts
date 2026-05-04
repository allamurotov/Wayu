import { UpdateApplicationDto } from '../dto/update-application.dto';

export class UpdateApplicationCommand {
  constructor(public readonly id: number, public readonly updateApplicationDto: UpdateApplicationDto) {}
}
