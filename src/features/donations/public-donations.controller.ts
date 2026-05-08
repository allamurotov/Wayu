import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { Donation } from './entities/donation.entity';

@ApiTags('donations')
@Controller('donations')
export class PublicDonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all donations' })
  @ApiResponse({
    status: 200,
    description: 'Donations retrieved successfully',
    type: [Donation],
  })
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get donation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Donation retrieved successfully',
    type: Donation,
  })
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(+id);
  }
}
