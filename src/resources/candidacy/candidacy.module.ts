import { Module, forwardRef } from '@nestjs/common';
import { CandidacyController } from './candidacy.controller';
import { CandidacyService } from './candidacy.service';
import { Candidacy } from './entities/candidacy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOfferService } from '../job_offer/job_offer.service';
import { CandidateService } from '../candidate/candidate.service';
import { JobOfferModule } from '../job_offer/job_offer.module';
import { EmailService } from '@src/mailer/sendMail';
import { UtilizadorService } from '../utilizador/utilizador.service';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { EmailverificationModule } from '../emailverification/emailverification.module';
import { CandidateCandidacyService } from '../candidate_candidacy/candidate_candidacy.service';
import { CandidateCandidacyModule } from '../candidate_candidacy/candidate_candidacy.module';
import { Candidate_Candidacy } from '../candidate_candidacy/entities/candidate_candidacy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidacy, Candidate_Candidacy]),
    forwardRef(() => JobOfferModule),
    forwardRef(() => UtilizadorModule),
    forwardRef(() => EmailverificationModule),
    forwardRef(() => CandidateCandidacyModule),
  ],
  controllers: [CandidacyController],
  providers: [
    CandidacyService,
    JobOfferService,
    CandidateService,
    EmailService,
    UtilizadorService,
    CandidateCandidacyService,
  ],
  exports: [CandidacyService, TypeOrmModule],
})
export class CandidacyModule {}
