import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Protected, Roles } from 'src/decoratores';
import { UserRoles } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @Protected(true)
  @Roles([UserRoles.Admin])
  async findAll() {
    return await this.questionService.findAll();
  }

  @Post()
  @Protected(true)
  @Roles([UserRoles.Admin])
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiOperation({ summary: 'find One By Category' })
  @Get(':id')
  @Protected(false)
  @Roles([UserRoles.User])
  findOneByCategory(@Param('id') id: string) {
    return this.questionService.findOneByCategory(id);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
