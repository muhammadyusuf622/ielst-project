import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from './prisma';
import { AdminModule, QuestionModule } from './modules';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RoleGuard } from './guards';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AdminModule,
    QuestionModule,
    CategoryModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ]
})
export class AppModule {}
