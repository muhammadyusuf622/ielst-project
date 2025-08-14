import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";

@Injectable()
export class QuestionService{
  constructor(private readonly prisma: PrismaService) {};

  async getAll() {
    const data = await this.prisma.question.findMany();

    return {
      message: "success",
      data: data
    }
  }
}