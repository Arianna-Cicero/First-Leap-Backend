import { forwardRef, Module } from '@nestjs/common';
import { SelectionPhaseController } from './selection_phase.controller';
import { SelectionPhaseService } from './selection_phase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionPhase } from './entities/selection_phase.entity';
import { SelectionProcess } from '../selection_process/entities/selection_process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SelectionPhase])],
  controllers: [SelectionPhaseController],
  providers: [SelectionPhaseService],
  exports: [SelectionPhaseService, TypeOrmModule],
})
export class SelectionPhaseModule {}
