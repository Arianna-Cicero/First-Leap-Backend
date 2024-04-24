import { JobType } from 'src/resources/jobtype/entities/jobtype.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class JobOffer {
  @PrimaryGeneratedColumn({ type: 'int' })
  JO: number;

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

  @ManyToOne(() => JobType, (jobtype) => jobtype.joboffer)
  jobtype: JobType;
}
