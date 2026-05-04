import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { QuestionStatus } from '../../../common/enums/question-status.enum';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionStatus)
  @IsNotEmpty()
  status: QuestionStatus;
}
