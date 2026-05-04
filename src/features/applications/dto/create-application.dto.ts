import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { ApplicationStatus } from '../../../common/enums/application-status.enum';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  vacancyId: number;

  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
