import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma';
import { isUUID } from 'validator';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.question.findMany();

    return {
      message: 'success',
      data: data,
    };
  }

  async create(payload: CreateQuestionDto) {

    const foundCategory = await this.prisma.category.findFirst({
      where: { name: payload.categoryName },
    });

    if (!foundCategory) {
      throw new NotFoundException('category not found');
    }

    const orderCount = await this.prisma.question.count({
      where: { categoryId: foundCategory.id },
    });

    const data = await this.prisma.question.create({
      data: {
        categoryId: foundCategory.id,
        text: payload.text,
        optionA: payload.optionA,
        optionB: payload.optionB,
        optionC: payload.optionC,
        optionD: payload.optionD,
        correct: payload.correct,
        order: orderCount + 1,
      },
    });

    return {
      message: 'success',
      data: data,
    };
  }

  async findOneByCategory(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('category id error');
    }

    const foundCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!foundCategory) {
      throw new NotFoundException('category not found');
    }

    const data = await this.prisma.question.findMany({
      where: { categoryId: id },
    });

    return {
      message: 'success',
      data: data,
    };
  }

  async update(id: string, payload: UpdateQuestionDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('question id error');
    }

    const foundQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!foundQuestion) {
      throw new NotFoundException('question not found');
    }

    const data = await this.prisma.question.update({
      where: { id },
      data: {
        text: payload.text || foundQuestion.text,
        optionA: payload.optionA || foundQuestion.optionA,
        optionB: payload.optionB || foundQuestion.optionB,
        optionC: payload.optionC || foundQuestion.optionC,
        optionD: payload.optionD || foundQuestion.optionD,
        correct: payload.correct || foundQuestion.correct,
      },
    });

    return {
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('question id error');
    }

    const foundQuestion = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!foundQuestion) {
      throw new NotFoundException('question not found');
    }

    await this.prisma.question.delete({where: {id}})

    return {
      message: "success",
    };
  }
}
