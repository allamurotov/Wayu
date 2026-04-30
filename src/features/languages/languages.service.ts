import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = this.languagesRepository.create(createLanguageDto);
    return this.languagesRepository.save(language);
  }

  async findAll(): Promise<Language[]> {
    return this.languagesRepository.find();
  }

  async findOne(id: number): Promise<Language> {
    return this.languagesRepository.findOneBy({ id });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto): Promise<Language> {
    await this.languagesRepository.update(id, updateLanguageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.languagesRepository.delete(id);
  }
}
