import { Module } from '@nestjs/common';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';
import { JobOffer } from './entities/job_offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([JobOffer])],
  controllers: [JobOfferController],
  providers: [JobOfferService],
})
export class JobOfferModule {}
