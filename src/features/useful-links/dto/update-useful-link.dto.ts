import { PartialType } from '@nestjs/mapped-types';
import { CreateUsefulLinkDto } from './create-useful-link.dto';

export class UpdateUsefulLinkDto extends PartialType(CreateUsefulLinkDto) {}
