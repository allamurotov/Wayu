import { CreateStaticInfoDto } from '../dto/create-static-info.dto';

export class CreateStaticInfoCommand {
  constructor(public readonly createStaticInfoDto: CreateStaticInfoDto) {}
}
