import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('candidate_candidacy')
export class Candidate_Candidacy {
  @PrimaryGeneratedColumn({ type: 'int' })
  Candidacy_Candidacy_id: number;

  // @PrimaryGeneratedColumn({ type: 'int' })
  // Candidate_Candidate_id: number;

  @ManyToOne(() => Candidacy, (candidacy) => candidacy.candidate_candidacy)
  @JoinColumn({ name: 'candidacy_id' })
  candidacy_id: Candidacy;

  @ManyToOne(() => Candidate, (candidate) => candidate.candidate_candidacy)
  @JoinColumn({ name: 'User_id' })
  candidate: Candidate;

  constructor(candidate_candidacy: Candidate_Candidacy) {
    Object.assign(this, candidate_candidacy);
  }
}
