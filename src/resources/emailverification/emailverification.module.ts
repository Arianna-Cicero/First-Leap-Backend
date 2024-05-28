import { Module } from '@nestjs/common';
import { EmailverificationService } from './emailverification.service';
import { EmailverificationController } from './emailverification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emailverification } from './entities/emailverification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emailverification])],
  controllers: [EmailverificationController],
  providers: [EmailverificationService],
  exports: [EmailverificationService],
})
export class EmailverificationModule {}
