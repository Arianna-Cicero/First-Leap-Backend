import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';
import { JobOffer } from './entities/job_offer.entity';
import { CandidateModule } from '../candidate/candidate.module';
import { EmailService } from '@src/mailer/sendMail';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOffer]),
    forwardRef(() => CandidateModule),
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService, EmailService],
  exports: [JobOfferService, TypeOrmModule],
})
export class JobOfferModule {}
