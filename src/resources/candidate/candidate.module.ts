import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { Candidate } from './entities/candidate.entity';
import { EmailverificationModule } from '../emailverification/emailverification.module';
import { EmailService } from '@src/mailer/sendMail';
import { EmailModule } from '@src/modules/email.module';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { Emailverification } from '../emailverification/entities/emailverification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate, Emailverification]),
    forwardRef(() => EmailverificationModule),
    forwardRef(() => EmailModule),
    forwardRef(() => UtilizadorModule),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [CandidateService, TypeOrmModule],
})
export class CandidateModule {}
