import { IsString, IsNotEmpty, IsNumber, MaxLength, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'Event category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ description: 'Event title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @ApiProperty({ description: 'Event content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Event image URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  image: string;

  @ApiProperty({ description: 'Event date' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Event address' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  address: string;
}
