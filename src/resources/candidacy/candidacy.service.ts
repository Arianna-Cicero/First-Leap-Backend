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
import { EmailverificationService } from '../emailverification/emailverification.service';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { EmailverificationModule } from '../emailverification/emailverification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidacy]),
    forwardRef(() => JobOfferModule),
    forwardRef(() => UtilizadorModule),
    forwardRef(() => EmailverificationModule),
  ],
  controllers: [CandidacyController],
  providers: [
    CandidacyService,
    JobOfferService,
    CandidateService,
    EmailService,
    UtilizadorService,
    // EmailverificationService,
  ],
  exports: [CandidacyService], // Export CandidacyService if needed by other modules
})
export class CandidacyModule {}
