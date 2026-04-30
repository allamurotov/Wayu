import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Book author ID' })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({ description: 'Book category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ description: 'Book title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @ApiProperty({ description: 'Book image URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  image: string;

  @ApiPropertyOptional({ description: 'Book description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Book file URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  file: string;

  @ApiProperty({ description: 'Book pages count' })
  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @ApiProperty({ description: 'Book year' })
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
