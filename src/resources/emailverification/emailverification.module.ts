import { Module } from '@nestjs/common';
import { EmailverificationService } from './emailverification.service';
import { EmailverificationController } from './emailverification.controller';

@Module({
  controllers: [EmailverificationController],
  providers: [EmailverificationService],
})
export class EmailverificationModule {}
