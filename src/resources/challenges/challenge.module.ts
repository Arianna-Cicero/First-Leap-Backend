import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
