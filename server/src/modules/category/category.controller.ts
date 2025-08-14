import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Protected, Roles } from 'src/decoratores';
import { UserRoles } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Protected(false)
  @Roles([UserRoles.User])
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Post()
  @Protected(true)
  @Roles([UserRoles.Admin])
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
