import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Address } from 'src/resources/address/entities/address.entity';
import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Company } from 'src/resources/company/entities/company.entity';
import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';
import { Feedback } from 'src/resources/feedback/entities/feedback.entity';
import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';
import { Jobtype } from 'src/resources/jobtype/entities/jobtype.entity';
import { PostalCode } from 'src/resources/postal_code/entities/postal_code.entity';
import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import { Result } from 'src/resources/result/entities/result.entity';
import { SelectionPhase } from 'src/resources/selection_phase/entities/selection_phase.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Vacancy } from 'src/resources/vacancy/entities/vacancy.entity';
import { Admin } from 'src/resources/admin/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        entities: [Utilizador, Address, Admin, Candidacy, Candidate, Candidate_Candidacy, Company, Emailverification, Feedback, JobOffer, Jobtype, 
          PostalCode, Recruiter, Result, SelectionPhase, SelectionProcess, Vacancy],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
