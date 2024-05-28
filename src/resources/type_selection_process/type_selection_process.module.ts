import { forwardRef, Module } from '@nestjs/common';
import { TypeSelectionProcessService } from './type_selection_process.service';
import { TypeSelectionProcessController } from './type_selection_process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSelectionProcess } from './entities/type_selection_process.entity';
import { SelectionProcessModule } from '../selection_process/selection_process.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSelectionProcess]),
    forwardRef(() => SelectionProcessModule),
  ],
  controllers: [TypeSelectionProcessController],
  providers: [TypeSelectionProcessService],
  exports: [TypeSelectionProcessService],
})
export class TypeSelectionProcessModule {}
