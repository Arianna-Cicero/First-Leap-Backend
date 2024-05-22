import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Result } from 'src/resources/result/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('candidacy')
export class Candidacy {
  @PrimaryGeneratedColumn({ type: 'int' })
  Candidacy_id: number;

  constructor(candidacy: Partial<Candidacy>) {
    Object.assign(this, candidacy);
  }

  @OneToMany(
    () => Candidate_Candidacy,
    (candidate_candidacy) => candidate_candidacy.candidacy,
  )
  candidate_candidacy: Candidate_Candidacy[];

  @OneToMany(() => Result, (result) => result.candidacy)
  result: Result[];
}
