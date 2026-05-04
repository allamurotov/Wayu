import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy)
    private vacanciesRepository: Repository<Vacancy>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const vacancy = this.vacanciesRepository.create(createVacancyDto);
    return this.vacanciesRepository.save(vacancy);
  }

  async findAll(): Promise<Vacancy[]> {
    return this.vacanciesRepository.find({ relations: ['applications'] });
  }

  async findOne(id: number): Promise<Vacancy | null> {
    return this.vacanciesRepository.findOne({ 
      where: { id }, 
      relations: ['applications'] 
    });
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy | null> {
    await this.vacanciesRepository.update(id, updateVacancyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vacanciesRepository.delete(id);
  }
}
