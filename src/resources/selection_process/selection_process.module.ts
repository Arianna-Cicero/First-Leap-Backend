import { forwardRef, Module } from '@nestjs/common';
import { SelectionProcessController } from './selection_process.controller';
import { SelectionProcessService } from './selection_process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionProcess } from './entities/selection_process.entity';
import { CandidateService } from '../candidate/candidate.service';
import { SelectionPhaseService } from '../selection_phase/selection_phase.service';
import { CandidateModule } from '../candidate/candidate.module';
import { EmailService } from 'src/mailer/sendMail';
import { JobOfferService } from '../job_offer/job_offer.service';
import { JobOfferModule } from '../job_offer/job_offer.module';
import { SchedulerModule } from 'src/modules/scheduler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelectionProcess]),
    forwardRef(() => CandidateModule),
    forwardRef(() => JobOfferModule),
    forwardRef(() => SchedulerModule),
  ],
  controllers: [SelectionProcessController],
  providers: [
    SelectionProcessService,
    CandidateService,
    SelectionPhaseService,
    EmailService,
    JobOfferService,
  ],
  exports: [SelectionProcessService],
})
export class SelectionProcessModule {}
