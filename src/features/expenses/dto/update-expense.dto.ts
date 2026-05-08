import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseDto {
  @ApiProperty({ description: 'Expense amount', required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Expense date', required: false })
  @IsOptional()
  date?: Date;

  @ApiProperty({ description: 'Expense title', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Expense description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Transaction ID', required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;
}
