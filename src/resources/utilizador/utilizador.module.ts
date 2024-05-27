import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { UtilizadorService } from './utilizador.service';
import { UtilizadorController } from './utilizador.controller';
import { AdminModule } from '../admin/admin.module';
import { CandidateModule } from '../candidate/candidate.module';
import { RecruiterModule } from '../recruiter/recruiter.module';
import { EmailverificationModule } from '../emailverification/emailverification.module';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Utilizador]),
    forwardRef(() => AdminModule),
    forwardRef(() => CandidateModule),
    forwardRef(() => RecruiterModule),
    forwardRef(() => EmailverificationModule),
  ],
  controllers: [UtilizadorController],
  providers: [UtilizadorService],
  exports: [UtilizadorService, TypeOrmModule],
})
export class UtilizadorModule {}
