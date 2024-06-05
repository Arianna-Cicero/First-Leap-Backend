import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailController } from '@src/controllers/email.controller';
import { EmailService } from 'src/mailer/sendMail';
import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emailverification])],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
