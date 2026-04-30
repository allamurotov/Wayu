import { IsString, IsNotEmpty, MaxLength, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '../../common/enums/application-status.enum';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Application full name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  fullName: string;

  @ApiProperty({ description: 'Application phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phoneNumber: string;

  @ApiProperty({ description: 'Application email' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @ApiProperty({ description: 'Vacancy ID' })
  @IsNumber()
  @IsNotEmpty()
  vacancyId: number;

  @ApiProperty({ description: 'Application resume URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  resume: string;

  @ApiPropertyOptional({ description: 'Application status', enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
