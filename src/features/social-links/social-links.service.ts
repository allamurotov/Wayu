import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink)
    private socialLinksRepository: Repository<SocialLink>,
  ) {}

  async create(createSocialLinkDto: CreateSocialLinkDto): Promise<SocialLink> {
    const socialLink = this.socialLinksRepository.create(createSocialLinkDto);
    return this.socialLinksRepository.save(socialLink);
  }

  async findAll(): Promise<SocialLink[]> {
    return this.socialLinksRepository.find();
  }

  async findOne(id: number): Promise<SocialLink> {
    return this.socialLinksRepository.findOneBy({ id });
  }

  async update(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<SocialLink> {
    await this.socialLinksRepository.update(id, updateSocialLinkDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.socialLinksRepository.delete(id);
  }
}
