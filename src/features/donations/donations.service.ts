import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationsRepository: Repository<Donation>,
  ) {}

  async create(createDonationDto: CreateDonationDto): Promise<Donation> {
    const donation = this.donationsRepository.create(createDonationDto);
    return this.donationsRepository.save(donation);
  }

  async findAll(): Promise<Donation[]> {
    return this.donationsRepository.find();
  }

  async findOne(id: number): Promise<Donation> {
    const donation = await this.donationsRepository.findOneBy({ id });
    if (!donation) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }
    return donation;
  }

  async update(
    id: number,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    const existingDonation = await this.donationsRepository.findOne({
      where: { id },
    });
    if (!existingDonation) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }

    await this.donationsRepository.update(id, updateDonationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingDonation = await this.donationsRepository.findOne({
      where: { id },
    });
    if (!existingDonation) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }

    await this.donationsRepository.delete(id);
  }
}
