import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({ description: 'Country title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;

  @ApiProperty({ description: 'Country flag URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  flag: string;
}
