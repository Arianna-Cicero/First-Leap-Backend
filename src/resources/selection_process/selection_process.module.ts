import { Module } from '@nestjs/common';
import { SelectionProcessController } from './selection_process.controller';
import { SelectionProcessService } from './selection_process.service';

@Module({
  controllers: [SelectionProcessController],
  providers: [SelectionProcessService]
})
export class SelectionProcessModule {}
