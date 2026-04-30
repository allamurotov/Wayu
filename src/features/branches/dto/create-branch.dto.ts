import { IsString, IsNotEmpty, IsNumber, MaxLength, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ description: 'Country ID' })
  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @ApiProperty({ description: 'Representative ID' })
  @IsNumber()
  @IsNotEmpty()
  representativeId: number;

  @ApiProperty({ description: 'Branch city' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  city: string;

  @ApiProperty({ description: 'Branch latitude' })
  @IsDecimal()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Branch longitude' })
  @IsDecimal()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({ description: 'Branch phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phoneNumber: string;
}
