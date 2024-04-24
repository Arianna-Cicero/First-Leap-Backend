import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobType {
  @PrimaryGeneratedColumn({ type: 'int' })
  type_id: number;

  @Column({ type: 'char', length: 50 })
  jobtype_desc: string;

  @OneToMany(() => JobOffer, (joboffer) => joboffer.jobtype)
  joboffer: JobOffer[];
}
