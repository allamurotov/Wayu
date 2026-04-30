import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsCategoryDto {
  @ApiProperty({ description: 'News category title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;
}
