import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma';
import { isUUID } from 'validator';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.category.findMany();

    return {
      message: 'success',
      data: data,
    };
  }

  async create(payload: CreateCategoryDto) {

    const foundCategory = await this.prisma.category.findFirst({
      where: { name: payload.name },
    });

    if (foundCategory) {
      throw new BadRequestException('Category already exists');
    }

    const data = await this.prisma.category.create({
      data: { name: payload.name },
    });

    return {
      message: 'success',
      data: data,
    };
  }

  async update(id: string, payload: UpdateCategoryDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Id error format');
    }

    const foundCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    const data = await this.prisma.category.update({
      where: { id },
      data: {
        name: payload.name,
      },
    });

    return {
      message: 'success',
      data: data,
    };
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Id error format');
    }

    const foundCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.category.delete({where: {id}});

    return {
      message: "success"
    };
  }
}
