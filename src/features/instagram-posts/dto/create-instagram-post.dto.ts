import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstagramPostDto {
  @ApiProperty({ description: 'Instagram post image URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  image: string;

  @ApiProperty({ description: 'Instagram post link' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  link: string;
}
