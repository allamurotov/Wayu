import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCategoryDto {
  @ApiProperty({ description: 'Event category title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;
}
