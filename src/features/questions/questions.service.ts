import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionsRepository.create(createQuestionDto);
    return this.questionsRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  async findOne(id: number): Promise<Question | null> {
    return this.questionsRepository.findOneBy({ id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question | null> {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
