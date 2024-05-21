import { Module } from '@nestjs/common';
import { JobtypeService } from './job_type.service';
import { JobtypeController } from './job_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from './entities/job_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobType])],
  controllers: [JobtypeController],
  providers: [JobtypeService],
})
export class Job_typeModule {}
