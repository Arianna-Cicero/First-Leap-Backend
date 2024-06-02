import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailverificationService } from './emailverification.service';
import { EmailverificationController } from './emailverification.controller';
import { Emailverification } from './entities/emailverification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emailverification])],
  controllers: [EmailverificationController],
  providers: [EmailverificationService],
  exports: [EmailverificationService],
})
export class EmailverificationModule {}
