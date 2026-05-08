import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';

@ApiTags('donations')
@Controller('admin/donations')
export class AdminDonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create donation' })
  @ApiResponse({
    status: 201,
    description: 'Donation created successfully',
    type: Donation,
  })
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

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

  @Patch(':id')
  @ApiOperation({ summary: 'Update donation' })
  @ApiResponse({
    status: 200,
    description: 'Donation updated successfully',
    type: Donation,
  })
  update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    return this.donationsService.update(+id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete donation' })
  @ApiResponse({ status: 200, description: 'Donation deleted successfully' })
  remove(@Param('id') id: string) {
    return this.donationsService.remove(+id);
  }
}
