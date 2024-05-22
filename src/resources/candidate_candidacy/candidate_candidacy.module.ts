import { Module } from '@nestjs/common';
import { CandidateCandidacyService } from './candidate_candidacy.service';
import { CandidateCandidacyController } from './candidate_candidacy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate_Candidacy } from './entities/candidate_candidacy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate_Candidacy])],
  controllers: [CandidateCandidacyController],
  providers: [CandidateCandidacyService],
})
export class CandidateCandidacyModule {}
