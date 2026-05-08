import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '../entities/donation.entity';

export class UpdateDonationDto {
  @ApiProperty({ description: 'Donation amount', required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Donor full name', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Donation date', required: false })
  @IsOptional()
  date?: Date;

  @ApiProperty({ description: 'Payment provider', required: false })
  @IsEnum(PaymentProvider)
  @IsOptional()
  paidBy?: PaymentProvider;
}
