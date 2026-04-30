import { IsString, IsNotEmpty, MaxLength, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ description: 'FAQ question' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  question: string;

  @ApiProperty({ description: 'FAQ answer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  answer: string;

  @ApiPropertyOptional({ description: 'Tag IDs', type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];
}
