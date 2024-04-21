import { Module } from '@nestjs/common';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService],
})
export class JobOfferModule {}
