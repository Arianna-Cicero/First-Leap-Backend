import { Module } from '@nestjs/common';
import { SelectionPhaseService } from './selection_phase.service';
import { SelectionPhaseController } from './selection_phase.controller';

@Module({
  controllers: [SelectionPhaseController],
  providers: [SelectionPhaseService],
})
export class SelectionPhaseModule {}
