import { Controller, Get } from "@nestjs/common";
import { QuestionService } from "./question.service";

@Controller('question')
export class QuestionController{
  constructor(private readonly service: QuestionService) {}

  @Get()
  async getAll() {
    return await this.service.getAll()
  }
}