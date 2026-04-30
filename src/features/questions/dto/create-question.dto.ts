import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '../../common/enums/question-status.enum';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Question full name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  fullName: string;

  @ApiProperty({ description: 'Question phone number' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phoneNumber: string;

  @ApiProperty({ description: 'Question text' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  question: string;

  @ApiProperty({ description: 'Question status', enum: QuestionStatus })
  @IsEnum(QuestionStatus)
  @IsNotEmpty()
  status: QuestionStatus;
}
