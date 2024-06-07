import { forwardRef, Module } from '@nestjs/common';
import { CandidateCandidacyService } from './candidate_candidacy.service';
import { CandidateCandidacyController } from './candidate_candidacy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate_Candidacy } from './entities/candidate_candidacy.entity';
import { CandidacyModule } from '../candidacy/candidacy.module';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate_Candidacy]),
    forwardRef(() => CandidacyModule),
    forwardRef(() => CandidateModule),
  ],
  controllers: [CandidateCandidacyController],
  providers: [CandidateCandidacyService, TypeOrmModule],
})
export class CandidateCandidacyModule {}
