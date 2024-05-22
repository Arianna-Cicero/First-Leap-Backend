import { forwardRef, Module } from '@nestjs/common';
import { SelectionProcessController } from './selection_process.controller';
import { SelectionProcessService } from './selection_process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionProcess } from './entities/selection_process.entity';
import { CandidateService } from '../candidate/candidate.service';
import { SelectionPhaseService } from '../selection_phase/selection_phase.service';
import { CandidateModule } from '../candidate/candidate.module';
//import { CandidacyModule } from 'src/resources/candidacy/candidacy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelectionProcess]),
    forwardRef(() => CandidateModule),
  ],
  controllers: [SelectionProcessController],
  providers: [SelectionProcessService, CandidateService, SelectionPhaseService],
})
export class SelectionProcessModule {}
