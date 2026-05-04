import { UpdateStaticInfoDto } from '../dto/update-static-info.dto';

export class UpdateStaticInfoCommand {
  constructor(public readonly id: number, public readonly updateStaticInfoDto: UpdateStaticInfoDto) {}
}
