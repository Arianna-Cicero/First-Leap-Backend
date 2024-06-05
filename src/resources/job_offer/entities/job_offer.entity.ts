import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { JobType } from 'src/resources/jobtype/entities/job_type.entity';
import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Vacancy } from 'src/resources/vancancy/entities/vacancy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('job_offer')
export class JobOffer {
  @PrimaryGeneratedColumn({ type: 'int' })
  JO_id: number;

  @Column({ type: 'char', length: 50, nullable: true })
  title: string;

  @Column({ type: 'char', length: 250, nullable: true, default: true })
  description: string;

  @Column({ type: 'char', length: 250, nullable: true })
  requisites: string;

  @Column({ type: 'char', length: 250, nullable: true })
  responsibilities: string;

  @Column({ type: 'char', length: 250, nullable: true })
  benefits: string;

  @Column({ type: 'char', length: 15, default: true, nullable: true })
  status: string;

  @CreateDateColumn({ type: 'datetime' })
  date_created: Date;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @ManyToOne(() => JobType, (jobType) => jobType.jobOffers)
  jobType: JobType;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.joboffer)
  recruiter: Recruiter;

  @OneToMany(() => Candidacy, (candidacy) => candidacy.joboffer)
  candidacy: Candidacy[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.joboffer)
  vacancy: Vacancy[];

  @OneToMany(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.job_offer,
  )
  selectionProcess: SelectionProcess[];

  constructor(joboffer: Partial<JobOffer>) {
    Object.assign(this, joboffer);
  }
}
