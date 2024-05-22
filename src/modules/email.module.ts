import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Emailverification])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
