import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';

@ApiTags('expenses')
@Controller('expenses')
export class PublicExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({
    status: 200,
    description: 'Expenses retrieved successfully',
    type: [Expense],
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiResponse({
    status: 200,
    description: 'Expense retrieved successfully',
    type: Expense,
  })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }
}
