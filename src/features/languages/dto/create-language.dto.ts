import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({ description: 'Language title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;
}
