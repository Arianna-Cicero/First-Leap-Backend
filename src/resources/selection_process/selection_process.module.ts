import { Module } from '@nestjs/common';
import { SelectionProcessController } from './selection_process.controller';
import { SelectionProcessService } from './selection_process.service';
//import { CandidacyModule } from 'src/resources/candidacy/candidacy.module';

@Module({
  //imports: [CandidacyModule],
  controllers: [SelectionProcessController],
  providers: [SelectionProcessService]
})
export class SelectionProcessModule {}
