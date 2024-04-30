import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Candidate_Candidacy {
  @PrimaryGeneratedColumn({ type: 'int' })
  candidate_candidacy_id: number;

  //   @ManyToOne(() => Candidacy, (candidacy) => candidacy.candidate_candidacy)
  //   candidacy: Candidacy;

  // @ManyToOne(() => Candidate, (candidate) => candidate.candidate_candidacy)
  // candidate: Candidate;
}
