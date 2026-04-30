import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsefulLink } from './entities/useful-link.entity';
import { CreateUsefulLinkDto } from './dto/create-useful-link.dto';
import { UpdateUsefulLinkDto } from './dto/update-useful-link.dto';

@Injectable()
export class UsefulLinksService {
  constructor(
    @InjectRepository(UsefulLink)
    private usefulLinksRepository: Repository<UsefulLink>,
  ) {}

  async create(createUsefulLinkDto: CreateUsefulLinkDto): Promise<UsefulLink> {
    const usefulLink = this.usefulLinksRepository.create(createUsefulLinkDto);
    return this.usefulLinksRepository.save(usefulLink);
  }

  async findAll(): Promise<UsefulLink[]> {
    return this.usefulLinksRepository.find();
  }

  async findOne(id: number): Promise<UsefulLink> {
    return this.usefulLinksRepository.findOneBy({ id });
  }

  async update(id: number, updateUsefulLinkDto: UpdateUsefulLinkDto): Promise<UsefulLink> {
    await this.usefulLinksRepository.update(id, updateUsefulLinkDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usefulLinksRepository.delete(id);
  }
}
