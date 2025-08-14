import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { PrismaService } from "src/prisma";
import { JwtHelper } from "src/helpers";
import { JwtService } from "@nestjs/jwt";



@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtService, JwtHelper],
  exports: [JwtService, JwtHelper],
})
export class AdminModule {};