import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateQuestionDto {
  @ApiProperty({ type: 'string', example: 'category name', required: true })
  @IsString()
  categoryName: string;
  @ApiProperty({ type: 'string', example: 'question', required: true })
  @IsString()
  text: string;
  @ApiProperty({ type: 'string', example: 'questionA', required: true })
  @IsString()
  optionA: string;
  @ApiProperty({ type: 'string', example: 'questionB', required: true })
  @IsString()
  optionB: string;
  @ApiProperty({ type: 'string', example: 'questionC', required: true })
  @IsString()
  optionC: string;
  @ApiProperty({ type: 'string', example: 'questionD', required: true })
  @IsString()
  optionD: string;
  @ApiProperty({ type: 'string', example: 'answer', required: true })
  @IsString()
  correct: string;
}

