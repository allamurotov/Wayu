import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Representative } from './entities/representative.entity';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';

@Injectable()
export class RepresentativesService {
  constructor(
    @InjectRepository(Representative)
    private representativesRepository: Repository<Representative>,
  ) {}

  async create(createRepresentativeDto: CreateRepresentativeDto): Promise<Representative> {
    const representative = this.representativesRepository.create(createRepresentativeDto);
    return this.representativesRepository.save(representative);
  }

  async findAll(): Promise<Representative[]> {
    return this.representativesRepository.find();
  }

  async findOne(id: number): Promise<Representative> {
    return this.representativesRepository.findOneBy({ id });
  }

  async update(id: number, updateRepresentativeDto: UpdateRepresentativeDto): Promise<Representative> {
    await this.representativesRepository.update(id, updateRepresentativeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.representativesRepository.delete(id);
  }
}
