import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos';
import { Response } from 'express';
import { JwtHelper } from 'src/helpers';
import { UserRoles } from '@prisma/client';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtHelper,
  ) {}

  onModuleInit() {
    this.seedFile();
  }

  async getAll() {
    const data = await this.prisma.admin.findMany();

    return {
      message: 'success',
      data: data,
    };
  }

  async login(payload: LoginDto, res: Response) {
    const foundAdmin = await this.prisma.admin.findUnique({
      where: { email: payload.email },
    });

    if (!foundAdmin) {
      throw new NotFoundException('Admin Not Found');
    }

    const openPass = await bcrypt.compare(
      payload.password,
      foundAdmin.password,
    );

    if (!openPass) {
      throw new BadRequestException('Password error');
    }

    const token = await this.jwt.generateToken({ id: foundAdmin.id, role: foundAdmin.role });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });

    return {
      message: 'success',
      data: foundAdmin,
    };
  }

  async seedFile() {
    const admins = [
      {
        email: 'admin@gmail.com',
        password: 'admin',
      },
    ];


    try {
      for (let admin of admins) {
        const foundAdmin = await this.prisma.admin.findUnique({
          where: { email: admin.email },
        });

        if (!foundAdmin) {
          const hashPass: string = await bcrypt.hash(admin.password, 10);
          await this.prisma.admin.create({
            data: { email: admin.email, password: hashPass, role: UserRoles.Admin },
          });
        }
      }
      console.log('Default admin created ✔️');
    } catch (error) {
      console.log(error.message, 'default admin create error');
    }
  }
}
