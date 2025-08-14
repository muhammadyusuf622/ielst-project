import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty({ type: 'string', example: 'question', required: true })
  @IsOptional()
  @IsString()
  text: string;
  @ApiProperty({ type: 'string', example: 'questionA', required: true })
  @IsOptional()
  @IsString()
  optionA: string;
  @ApiProperty({ type: 'string', example: 'questionB', required: true })
  @IsOptional()
  @IsString()
  optionB: string;
  @ApiProperty({ type: 'string', example: 'questionC', required: true })
  @IsOptional()
  @IsString()
  optionC: string;
  @ApiProperty({ type: 'string', example: 'questionD', required: true })
  @IsOptional()
  @IsString()
  optionD: string;
  @ApiProperty({ type: 'string', example: 'answer', required: true })
  @IsOptional()
  @IsString()
  correct: string;
}
