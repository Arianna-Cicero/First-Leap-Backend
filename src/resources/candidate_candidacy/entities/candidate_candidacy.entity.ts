import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity('candidate_candidacy')
export class Candidate_Candidacy {
  @PrimaryColumn({ type: 'int' })
  Candidate_candidate_id: number;

  @PrimaryColumn({ type: 'int' })
  Candidacy_Candidacy_id: number;

  @ManyToOne(() => Candidacy, (candidacy) => candidacy.candidate_candidacy)
  @JoinColumn({ name: 'Candidacy_Candidacy_id' })
  candidacy: Candidacy;

  @ManyToOne(() => Candidate, (candidate) => candidate.candidate_candidacy)
  @JoinColumn({ name: 'Candidate_candidate_id' })
  candidate: Candidate;
}
