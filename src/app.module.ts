import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { EmailverificationModule } from './resources/emailverification/emailverification.module';
import { DatabaseService } from './services/database.service';
import { HealthController } from './controllers/health.controller';
import { PostalCodeModule } from './resources/postal_code/postal_code.module';
import { JobOfferModule } from './resources/job_offer/job_offer.module';
import { JobtypeModule } from './resources/jobtype/jobtype.module';
import { UtilizadorModule } from './resources/utilizador/utilizador.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule,
    // EmailverificationModule,
    PostalCodeModule,
    JobOfferModule,
    JobtypeModule,
    // UtilizadorModule,
  ],
  controllers: [AppController,  HealthController],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    AppService,
    DatabaseService
  ],
})
export class AppModule {}
