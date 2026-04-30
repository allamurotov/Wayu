import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventCategoriesService } from './event-categories.service';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { EventCategory } from './entities/event-category.entity';

@ApiTags('event-categories')
@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategoriesService: EventCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create event category' })
  @ApiResponse({ status: 201, description: 'Event category created successfully', type: EventCategory })
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategoriesService.create(createEventCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all event categories' })
  @ApiResponse({ status: 200, description: 'Event categories retrieved successfully', type: [EventCategory] })
  findAll() {
    return this.eventCategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event category by ID' })
  @ApiResponse({ status: 200, description: 'Event category retrieved successfully', type: EventCategory })
  findOne(@Param('id') id: string) {
    return this.eventCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event category' })
  @ApiResponse({ status: 200, description: 'Event category updated successfully', type: EventCategory })
  update(@Param('id') id: string, @Body() updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.eventCategoriesService.update(+id, updateEventCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event category' })
  @ApiResponse({ status: 200, description: 'Event category deleted successfully' })
  remove(@Param('id') id: string) {
    return this.eventCategoriesService.remove(+id);
  }
}
