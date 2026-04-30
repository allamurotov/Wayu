import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqTag } from './entities/faq-tag.entity';

@Injectable()
export class FaqTagsService {
  constructor(
    @InjectRepository(FaqTag)
    private faqTagsRepository: Repository<FaqTag>,
  ) {}

  async create(faqId: number, tagId: number): Promise<FaqTag> {
    const faqTag = this.faqTagsRepository.create({ faqId, tagId });
    return this.faqTagsRepository.save(faqTag);
  }

  async findAll(): Promise<FaqTag[]> {
    return this.faqTagsRepository.find({ relations: ['faq', 'tag'] });
  }

  async findByFaq(faqId: number): Promise<FaqTag[]> {
    return this.faqTagsRepository.find({ 
      where: { faqId }, 
      relations: ['faq', 'tag'] 
    });
  }

  async findByTag(tagId: number): Promise<FaqTag[]> {
    return this.faqTagsRepository.find({ 
      where: { tagId }, 
      relations: ['faq', 'tag'] 
    });
  }

  async findOne(faqId: number, tagId: number): Promise<FaqTag> {
    return this.faqTagsRepository.findOne({ 
      where: { faqId, tagId }, 
      relations: ['faq', 'tag'] 
    });
  }

  async remove(faqId: number, tagId: number): Promise<void> {
    await this.faqTagsRepository.delete({ faqId, tagId });
  }
}
