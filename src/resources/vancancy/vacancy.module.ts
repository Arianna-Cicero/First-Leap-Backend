import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacancy } from './entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy])],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
