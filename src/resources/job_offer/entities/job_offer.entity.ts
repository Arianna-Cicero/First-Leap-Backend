import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { JobType } from 'src/resources/jobtype/entities/job_type.entity';
import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import { Vacancy } from 'src/resources/vancancy/entities/vacancy.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('job_offer')
export class JobOffer {
  @PrimaryGeneratedColumn({ type: 'int' })
  JO_id: number;

  @Column({ type: 'char', length: 50 })
  title: string;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'char', length: 250 })
  requisites: string;

  @Column({ type: 'char', length: 250 })
  responsibilities: string;

  @Column({ type: 'char', length: 250 })
  benefits: string;

  @Column({ type: 'char', length: 15 })
  status: string;

  @Column({ type: 'date' })
  deadline: Date;

  @ManyToOne(() => JobType, (jobType) => jobType.jobOffers)
  jobType: JobType;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.joboffer)
  recruiter: Recruiter;

  @OneToMany(() => Candidacy, (candidacy) => candidacy.joboffer)
  candidacy: Candidacy[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.joboffer)
  vacancy: Vacancy[];

  constructor(joboffer: Partial<JobOffer>) {
    Object.assign(this, joboffer);
  }
}
