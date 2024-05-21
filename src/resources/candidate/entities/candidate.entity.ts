import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
// import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Candidate extends Utilizador {
  @Column({ type: 'blob' })
  cv: Buffer;

  @Column({ type: 'char', length: 50 })
  skills: string;

  @Column({ type: 'char', length: 50 })
  experience: string;

  // @ManyToOne(() => Utilizador, (utilizador) => utilizador.candidate)
  // utilizador: Utilizador;

  // @OneToMany(
  //   () => Candidate_Candidacy,
  //   (candidate_candidacy) => candidate_candidacy.candidate,
  // )
  // candidate_candidacy: Candidate_Candidacy[];
  @ManyToMany(() => Candidacy)
  candidacies: Candidacy[];

  constructor(candidate: Partial<Candidate>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, candidate);
  }
}
