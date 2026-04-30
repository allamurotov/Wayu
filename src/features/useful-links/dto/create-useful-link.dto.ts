import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsefulLinkDto {
  @ApiProperty({ description: 'Useful link title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  title: string;

  @ApiProperty({ description: 'Useful link icon' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  icon: string;

  @ApiProperty({ description: 'Useful link URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  link: string;
}
