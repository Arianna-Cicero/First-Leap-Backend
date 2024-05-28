import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { JobOfferModule } from 'src/resources/job_offer/job_offer.module';
import { SelectionProcessModule } from 'src/resources/selection_process/selection_process.module';
import { SchedulerService } from 'src/services/scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    forwardRef(() => JobOfferModule),
    forwardRef(() => SelectionProcessModule),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
