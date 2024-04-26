import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { UtilizadorModule } from './resources/utilizador/utilizador.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UtilizadorModule, AuthModule],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    AppService,
  ],
})
export class AppModule {}
