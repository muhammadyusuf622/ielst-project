import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from './prisma';
import { AdminModule, CategoryModule, QuestionModule } from './modules';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RoleGuard } from './guards';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AdminModule,
    CategoryModule,
    QuestionModule,
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
