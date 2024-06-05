import { forwardRef, Module } from '@nestjs/common';
import { TypeSelectionProcessService } from './type_selection_process.service';
import { TypeSelectionProcessController } from './type_selection_process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSelectionProcess } from './entities/type_selection_process.entity';
import { SelectionPhaseModule } from '../selection_phase/selection_phase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSelectionProcess]),
    // forwardRef(() => SelectionPhaseModule),
  ],
  controllers: [TypeSelectionProcessController],
  providers: [TypeSelectionProcessService],
  exports: [TypeSelectionProcessService, TypeOrmModule],
})
export class TypeSelectionProcessModule {}
