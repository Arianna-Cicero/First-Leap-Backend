import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { EmailverificationModule } from './resources/emailverification/emailverification.module';
import { HealthController } from './controllers/health.controller';
import { PostalCodeModule } from './resources/postal_code/postal_code.module';
import { JobOfferModule } from './resources/job_offer/job_offer.module';
import { Job_typeModule } from './resources/jobtype/job_type.module';
import { UtilizadorModule } from './resources/utilizador/utilizador.module';
import { CandidateModule } from './resources/candidate/candidate.module';
import { AdminModule } from './resources/admin/admin.module';
import { CandidateCandidacyModule } from './resources/candidate_candidacy/candidate_candidacy.module';
import { RecruiterModule } from './resources/recruiter/recruiter.module';
import { AddressModule } from './resources/address/address.module';
import { CompanyModule } from './resources/company/company.module';
import { CandidacyModule } from './resources/candidacy/candidacy.module';
import { SelectionProcessModule } from './resources/selection_process/selection_process.module';
import { SelectionPhaseModule } from './resources/selection_phase/selection_phase.module';
import { FeedbackModule } from './resources/feedback/feedback.module';
import { VacancyModule } from './resources/vancancy/vacancy.module';
import { ResultModule } from './resources/result/result.module';
import { SchedulerModule } from './modules/scheduler.module';
import { TypeSelectionProcessModule } from './resources/type_selection_process/type_selection_process.module';
import { ChallengeModule } from './resources/challenges/challenge.module';
import { WrittenTestsModule } from './resources/written_tests/written_tests.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EmailverificationModule,
    PostalCodeModule,
    JobOfferModule,
    Job_typeModule,
    UtilizadorModule,
    CandidateModule,
    AdminModule,
    RecruiterModule,
    CandidateCandidacyModule,
    CandidacyModule,
    AddressModule,
    CompanyModule,
    SelectionProcessModule,
    SelectionPhaseModule,
    FeedbackModule,
    VacancyModule,
    ResultModule,
    SchedulerModule,
    TypeSelectionProcessModule,
    ChallengeModule,
    WrittenTestsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    AppService,
  ],
})
export class AppModule {}
