import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { UtilizadorModule } from '../utilizador/utilizador.module';

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
