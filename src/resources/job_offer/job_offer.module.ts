import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';
import { JobOffer } from './entities/job_offer.entity';
import { CandidateModule } from '../candidate/candidate.module';
import { EmailService } from '@src/mailer/sendMail';
import { CandidacyService } from '../candidacy/candidacy.service';
import { CandidateCandidacyService } from '../candidate_candidacy/candidate_candidacy.service';
import { Candidate } from '../candidate/entities/candidate.entity';
import { CandidateService } from '../candidate/candidate.service';
import { EntityManager } from 'typeorm';
import { UtilizadorService } from '../utilizador/utilizador.service';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { CandidacyModule } from '../candidacy/candidacy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOffer, Candidate]),
    forwardRef(() => CandidateModule),
    forwardRef(() => JobOfferModule),
    forwardRef(() => UtilizadorModule),
    forwardRef(() => CandidacyModule),
  ],
  controllers: [JobOfferController],
  providers: [
    JobOfferService,
    EmailService,
    CandidacyService,
    CandidateService,
    CandidateCandidacyService,
    EntityManager,
    UtilizadorService,
    EmailverificationService,
  ],
  exports: [JobOfferService, TypeOrmModule],
})
export class JobOfferModule {}
