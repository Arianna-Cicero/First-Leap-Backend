import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobOfferService } from 'src/resources/job_offer/job_offer.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkDeadlines() {
    const jobOffers = await this.jobOfferService.findAll();

    const today = new Date().toISOString().split('T')[0];

    for (const offer of jobOffers) {
      if (offer.deadline.toISOString().split('T')[0] === today) {
        const selectionProcesses = offer.selectionProcess;
        if (selectionProcesses && selectionProcesses.length > 0) {
          for (const sp of selectionProcesses) {
            await this.jobOfferService.startSelectionProcess(
              offer.JO_id,
              sp.SP_id,
            );
          }
        }
      }
    }
  }
}
