import { forwardRef, Module } from '@nestjs/common';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';
import { JobOffer } from './entities/job_offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateService } from '../candidate/candidate.service';
import { CandidateModule } from '../candidate/candidate.module';
import { EmailModule } from 'src/modules/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOffer]),
    forwardRef(() => CandidateModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService, CandidateService],
  exports: [JobOfferService, TypeOrmModule],
})
export class JobOfferModule {}
