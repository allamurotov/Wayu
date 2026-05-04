import { Injectable } from '@nestjs/common';
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

  create(createStaticInfoDto: CreateStaticInfoDto): Promise<StaticInfo> {
    const staticInfo = this.staticInfoRepository.create(createStaticInfoDto);
    return this.staticInfoRepository.save(staticInfo);
  }

  findAll(): Promise<StaticInfo[]> {
    return this.staticInfoRepository.find();
  }

  findOne(id: number): Promise<StaticInfo | null> {
    return this.staticInfoRepository.findOne({ where: { id } });
  }

  update(id: number, updateStaticInfoDto: UpdateStaticInfoDto): Promise<StaticInfo | null> {
    this.staticInfoRepository.update(id, updateStaticInfoDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.staticInfoRepository.delete(id).then(() => {});
  }
}
