import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ description: 'Tag title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;
}
