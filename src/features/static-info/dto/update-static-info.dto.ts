import { PartialType } from '@nestjs/mapped-types';
import { CreateStaticInfoDto } from './create-static-info.dto';

export class UpdateStaticInfoDto extends PartialType(CreateStaticInfoDto) {}
