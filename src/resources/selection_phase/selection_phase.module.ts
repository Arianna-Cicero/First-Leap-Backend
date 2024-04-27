import { Module } from '@nestjs/common';
import { SelectionPhaseController } from './selection_phase.controller';
import { SelectionPhaseService } from './selection_phase.service';

@Module({
  controllers: [SelectionPhaseController],
  providers: [SelectionPhaseService]
})
export class SelectionPhaseModule {}
