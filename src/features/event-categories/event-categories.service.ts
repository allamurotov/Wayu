import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './entities/event-category.entity';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';

@Injectable()
export class EventCategoriesService {
  constructor(
    @InjectRepository(EventCategory)
    private eventCategoriesRepository: Repository<EventCategory>,
  ) {}

  async create(createEventCategoryDto: CreateEventCategoryDto): Promise<EventCategory> {
    const eventCategory = this.eventCategoriesRepository.create(createEventCategoryDto);
    return this.eventCategoriesRepository.save(eventCategory);
  }

  async findAll(): Promise<EventCategory[]> {
    return this.eventCategoriesRepository.find();
  }

  async findOne(id: number): Promise<EventCategory | null> {
    return this.eventCategoriesRepository.findOneBy({ id });
  }

  async update(id: number, updateEventCategoryDto: UpdateEventCategoryDto): Promise<EventCategory | null> {
    await this.eventCategoriesRepository.update(id, updateEventCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eventCategoriesRepository.delete(id);
  }
}
