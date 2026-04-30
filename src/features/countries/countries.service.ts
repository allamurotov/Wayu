import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = this.countriesRepository.create(createCountryDto);
    return this.countriesRepository.save(country);
  }

  async findAll(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countriesRepository.findOneBy({ id });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const existingCountry = await this.countriesRepository.findOne({ where: { id } });
    if (!existingCountry) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    
    await this.countriesRepository.update(id, updateCountryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const existingCountry = await this.countriesRepository.findOne({ where: { id } });
    if (!existingCountry) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    
    await this.countriesRepository.delete(id);
  }
}
