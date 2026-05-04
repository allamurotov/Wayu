import { IsString, IsNotEmpty, IsEnum, IsBoolean } from 'class-validator';
import { VacancyType } from '../../../common/enums/vacancy-type.enum';

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEnum(VacancyType)
  @IsNotEmpty()
  type: VacancyType;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
