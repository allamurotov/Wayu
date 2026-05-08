import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '../entities/donation.entity';

export class CreateDonationDto {
  @ApiProperty({ description: 'Donation amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Donor full name' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ description: 'Donation date' })
  date: Date;

  @ApiProperty({ description: 'Payment provider' })
  @IsEnum(PaymentProvider)
  paidBy: PaymentProvider;
}
