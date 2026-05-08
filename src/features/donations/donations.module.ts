import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationsService } from './donations.service';
import { AdminDonationsController } from './admin-donations.controller';
import { PublicDonationsController } from './public-donations.controller';
import { Donation } from './entities/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Donation])],
  controllers: [AdminDonationsController, PublicDonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
