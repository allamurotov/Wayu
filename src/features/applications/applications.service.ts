import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const application = this.applicationsRepository.create(createApplicationDto);
    return this.applicationsRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationsRepository.find({ relations: ['vacancy'] });
  }

  async findOne(id: number): Promise<Application | null> {
    return this.applicationsRepository.findOne({ 
      where: { id }, 
      relations: ['vacancy'] 
    });
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto): Promise<Application | null> {
    await this.applicationsRepository.update(id, updateApplicationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.applicationsRepository.delete(id);
  }
}
