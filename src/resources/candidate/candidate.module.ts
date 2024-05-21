import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { UtilizadorModule } from '../utilizador/utilizador.module';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate]), UtilizadorModule],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
