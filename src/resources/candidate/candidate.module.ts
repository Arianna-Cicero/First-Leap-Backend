import { forwardRef, Module } from '@nestjs/common';
import { Candidate } from './entities/candidate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    forwardRef(() => UtilizadorModule),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService, TypeOrmModule],
})
export class CandidateModule {}
