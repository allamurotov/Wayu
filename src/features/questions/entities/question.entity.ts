import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { QuestionStatus } from '../../../common/enums/question-status.enum';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 2000 })
  question: string;

  @Column({
    type: 'enum',
    enum: QuestionStatus,
  })
  status: QuestionStatus;
}
