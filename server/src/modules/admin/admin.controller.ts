import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dtos';
import { Response } from 'express';
import { Protected, Roles } from 'src/decoratores';
import { UserRoles } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Protected(true)
  @Roles([UserRoles.Admin])
  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Protected(false)
  @Roles([UserRoles.User])
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.service.login(body, res);
  }
}
