import { forwardRef, Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { Company } from '../company/entities/company.entity';
import { EmailModule } from '@src/modules/email.module';
import { Emailverification } from '../emailverification/entities/emailverification.entity';
import { EmailverificationModule } from '../emailverification/emailverification.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Recruiter, Emailverification]),
    forwardRef(() => UtilizadorModule),
    forwardRef(() => EmailverificationModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [RecruiterController],
  providers: [RecruiterService],
  exports: [RecruiterService, TypeOrmModule],
})
export class RecruiterModule {}
