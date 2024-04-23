import { Module } from '@nestjs/common';
import { JobtypeService } from './jobtype.service';
import { JobtypeController } from './jobtype.controller';

@Module({
  controllers: [JobtypeController],
  providers: [JobtypeService],
})
export class JobtypeModule {}
