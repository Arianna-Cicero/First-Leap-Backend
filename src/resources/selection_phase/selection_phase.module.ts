import { forwardRef, Module } from '@nestjs/common';
import { SelectionPhaseController } from './selection_phase.controller';
import { SelectionPhaseService } from './selection_phase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectionPhase } from './entities/selection_phase.entity';
import { TypeSelectionProcess } from '../type_selection_process/entities/type_selection_process.entity';
import { TypeSelectionProcessModule } from '../type_selection_process/type_selection_process.module';
import { TypeSelectionProcessService } from '../type_selection_process/type_selection_process.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SelectionPhase, TypeSelectionProcess]),
    forwardRef(() => TypeSelectionProcessModule),
  ],
  controllers: [SelectionPhaseController],
  providers: [SelectionPhaseService, TypeSelectionProcessService],
  exports: [SelectionPhaseService, TypeOrmModule],
})
export class SelectionPhaseModule {}
