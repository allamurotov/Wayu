import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStaticInfoDto {
  @ApiPropertyOptional({ description: 'App Store link' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  appStoreLink?: string;

  @ApiPropertyOptional({ description: 'Play Market link' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  playMarketLink?: string;

  @ApiProperty({ description: 'About us content' })
  @IsString()
  @IsNotEmpty()
  aboutUs: string;
}
