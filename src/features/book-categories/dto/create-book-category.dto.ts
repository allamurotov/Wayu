import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookCategoryDto {
  @ApiProperty({ description: 'Book category title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;
}
