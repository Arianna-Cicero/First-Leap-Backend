import { Module } from '@nestjs/common';
import { VacancyController } from './vancancy.controller';
import { VacancyService } from './vancancy.service';

@Module({
  controllers: [VacancyController],
  providers: [VacancyService]
})
export class VancancyModule {}
