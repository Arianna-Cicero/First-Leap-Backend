import { JobType } from 'src/resources/jobtype/entities/job_type.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
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

  constructor(joboffer: Partial<JobOffer>) {
    Object.assign(this, joboffer);
  }
}
