import { Module } from '@nestjs/common';
import { CandidacyController } from './candidacy.controller';
import { CandidacyService } from './candidacy.service';

@Module({
  controllers: [CandidacyController],
  providers: [CandidacyService],
  //exports: [CandidacyService],
})
export class CandidacyModule {}
