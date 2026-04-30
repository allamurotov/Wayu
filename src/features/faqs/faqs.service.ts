import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(Faq)
    private faqsRepository: Repository<Faq>,
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqsRepository.create(createFaqDto);
    return this.faqsRepository.save(faq);
  }

  async findAll(): Promise<Faq[]> {
    return this.faqsRepository.find({ 
      relations: ['faqTags', 'faqTags.tag'] 
    });
  }

  async findOne(id: number): Promise<Faq> {
    return this.faqsRepository.findOne({ 
      where: { id }, 
      relations: ['faqTags', 'faqTags.tag'] 
    });
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    await this.faqsRepository.update(id, updateFaqDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.faqsRepository.delete(id);
  }
}
