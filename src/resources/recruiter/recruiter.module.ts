import { forwardRef, Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { Company } from '../company/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recruiter]),
    forwardRef(() => UtilizadorModule),
  ],
  controllers: [RecruiterController],
  providers: [RecruiterService],
  exports: [RecruiterService, TypeOrmModule],
})
export class RecruiterModule {}
