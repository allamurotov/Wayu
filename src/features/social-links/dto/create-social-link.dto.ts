import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialLinkDto {
  @ApiProperty({ description: 'Social link title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  title: string;

  @ApiProperty({ description: 'Social link icon' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  icon: string;

  @ApiProperty({ description: 'Social link URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  link: string;
}
