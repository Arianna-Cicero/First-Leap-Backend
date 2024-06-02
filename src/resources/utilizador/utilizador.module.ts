import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { UtilizadorService } from './utilizador.service';
import { UtilizadorController } from './utilizador.controller';
import { AdminModule } from '../admin/admin.module';
import { CandidateModule } from '../candidate/candidate.module';
import { RecruiterModule } from '../recruiter/recruiter.module';
import { AuthModule } from '@src/auth/auth.module';
import { EmailModule } from '@src/modules/email.module';
import { EmailverificationModule } from '../emailverification/emailverification.module';
import { Emailverification } from '../emailverification/entities/emailverification.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Utilizador]),
    forwardRef(() => AdminModule),
    forwardRef(() => CandidateModule),
    forwardRef(() => RecruiterModule),
  ],
  controllers: [UtilizadorController],
  providers: [UtilizadorService],
  exports: [UtilizadorService, TypeOrmModule, UtilizadorService],
})
export class UtilizadorModule {}
