import { Module } from '@nestjs/common';
import { JobtypeService } from './jobtype.service';
import { JobtypeController } from './jobtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from './entities/jobtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobType])],
  controllers: [JobtypeController],
  providers: [JobtypeService],
})
export class JobtypeModule {}
