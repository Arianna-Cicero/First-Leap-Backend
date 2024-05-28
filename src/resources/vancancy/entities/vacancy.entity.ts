import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';

@Entity('vacancy')
export class Vacancy {
  @PrimaryGeneratedColumn({ type: 'int' })
  vacancy_id: number;

  @Column({ type: 'char', length: 50 })
  title: string;

  @Column({ type: 'char', length: 50 })
  description: string;

  @OneToMany(() => Candidate, (candidate) => candidate.vacancy)
  candidate: Candidate[];

  @ManyToOne(() => JobOffer, (joboffer) => joboffer.vacancy)
  joboffer: JobOffer;

  constructor(vacancy: Partial<Vacancy>) {
    Object.assign(this, vacancy);
  }
}
