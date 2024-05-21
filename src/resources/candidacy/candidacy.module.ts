import { Module } from '@nestjs/common';
import { CandidacyController } from './candidacy.controller';
import { CandidacyService } from './candidacy.service';
import { Candidacy } from './entities/candidacy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Candidacy])],
  controllers: [CandidacyController],
  providers: [CandidacyService],
})
export class CandidacyModule {}
