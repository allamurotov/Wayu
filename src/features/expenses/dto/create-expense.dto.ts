import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Expense amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Expense date' })
  date: Date;

  @ApiProperty({ description: 'Expense title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Expense description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Transaction ID' })
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}
