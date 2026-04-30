import { IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength, IsDate, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ description: 'News category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiPropertyOptional({ description: 'Country ID' })
  @IsOptional()
  @IsNumber()
  countryId?: number;

  @ApiProperty({ description: 'News title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @ApiProperty({ description: 'News image URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  image: string;

  @ApiProperty({ description: 'News date' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'News content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ description: 'Tag IDs', type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];
}
