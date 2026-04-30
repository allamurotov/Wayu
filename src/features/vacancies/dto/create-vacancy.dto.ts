import { IsString, IsNotEmpty, MaxLength, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyType } from '../../common/enums/vacancy-type.enum';

export class CreateVacancyDto {
  @ApiProperty({ description: 'Vacancy title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @ApiProperty({ description: 'Vacancy address' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  address: string;

  @ApiProperty({ description: 'Vacancy description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Vacancy phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phoneNumber: string;

  @ApiProperty({ description: 'Vacancy type', enum: VacancyType })
  @IsEnum(VacancyType)
  @IsNotEmpty()
  type: VacancyType;

  @ApiProperty({ description: 'Vacancy salary' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  salary: string;

  @ApiProperty({ description: 'Vacancy is active' })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
