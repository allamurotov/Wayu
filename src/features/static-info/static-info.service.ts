import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaticInfo } from './entities/static-info.entity';
import { CreateStaticInfoDto } from './dto/create-static-info.dto';
import { UpdateStaticInfoDto } from './dto/update-static-info.dto';

@Injectable()
export class StaticInfoService {
  constructor(
    @InjectRepository(StaticInfo)
    private staticInfoRepository: Repository<StaticInfo>,
  ) {}

  async create(createStaticInfoDto: CreateStaticInfoDto): Promise<StaticInfo> {
    // Check if static info already exists (singleton pattern)
    const existingCount = await this.staticInfoRepository.count();
    if (existingCount > 0) {
      throw new ConflictException('Static info already exists. Only one record is allowed.');
    }

    const staticInfo = this.staticInfoRepository.create(createStaticInfoDto);
    return this.staticInfoRepository.save(staticInfo);
  }

  async findAll(): Promise<StaticInfo[]> {
    return this.staticInfoRepository.find();
  }

  async findOne(id: number): Promise<StaticInfo> {
    return this.staticInfoRepository.findOneBy({ id });
  }

  async getSingleton(): Promise<StaticInfo> {
    const staticInfo = await this.staticInfoRepository.findOne({ 
      where: {}, 
      order: { id: 'ASC' } 
    });
    
    if (!staticInfo) {
      throw new NotFoundException('Static info not found. Please create one first.');
    }
    
    return staticInfo;
  }

  async update(id: number, updateStaticInfoDto: UpdateStaticInfoDto): Promise<StaticInfo> {
    await this.staticInfoRepository.update(id, updateStaticInfoDto);
    return this.findOne(id);
  }

  async updateSingleton(updateStaticInfoDto: UpdateStaticInfoDto): Promise<StaticInfo> {
    const staticInfo = await this.getSingleton();
    await this.staticInfoRepository.update(staticInfo.id, updateStaticInfoDto);
    return this.findOne(staticInfo.id);
  }

  async remove(id: number): Promise<void> {
    await this.staticInfoRepository.delete(id);
  }

  async resetSingleton(): Promise<void> {
    await this.staticInfoRepository.delete({});
  }
}
