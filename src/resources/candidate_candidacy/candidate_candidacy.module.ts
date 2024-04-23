import { Module } from '@nestjs/common';
import { CandidateCandidacyService } from './candidate_candidacy.service';
import { CandidateCandidacyController } from './candidate_candidacy.controller';

@Module({
  controllers: [CandidateCandidacyController],
  providers: [CandidateCandidacyService],
})
export class CandidateCandidacyModule {}
