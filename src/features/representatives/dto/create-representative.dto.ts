import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRepresentativeDto {
  @ApiProperty({ description: 'Representative full name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  fullName: string;

  @ApiProperty({ description: 'Representative image URL' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  image: string;

  @ApiProperty({ description: 'Representative email' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @ApiProperty({ description: 'Representative phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phoneNumber: string;

  @ApiProperty({ description: 'Representative resume' })
  @IsString()
  @IsNotEmpty()
  resume: string;
}
