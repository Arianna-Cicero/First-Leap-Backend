import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';
import { Result } from 'src/resources/result/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('candidacy')
export class Candidacy {
  @PrimaryGeneratedColumn({ type: 'int' })
  Candidacy_id: number;

  @OneToMany(
    () => Candidate_Candidacy,
    (candidate_candidacy) => candidate_candidacy.Candidacy_Candidacy_id,
  )
  candidate_candidacy: Candidate_Candidacy[];

  @OneToMany(() => Result, (result) => result.candidacy)
  result: Result[];

  @ManyToOne(() => JobOffer, (joboffer) => joboffer.candidacy)
  joboffer: JobOffer;

  constructor(candidacy: Partial<Candidacy>) {
    Object.assign(this, candidacy);
  }
}
