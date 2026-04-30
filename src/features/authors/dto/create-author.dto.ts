import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Author full name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  fullName: string;
}
