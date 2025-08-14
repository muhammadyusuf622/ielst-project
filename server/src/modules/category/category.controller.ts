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
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  @Protected(true)
  @Roles([UserRoles.Admin])
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Protected(true)
  @Roles([UserRoles.Admin])
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
