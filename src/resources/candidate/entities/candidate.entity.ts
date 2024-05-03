// import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Vacancy } from 'src/resources/vacancy/entities/vacancy.entity';
import {
  Admin,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn({ type: 'int' })
  candidate_id: number;

  @Column({ type: 'blob' })
  cv: Blob; // Não sei se funciona

  @Column({ type: 'char', length: 50 })
  skills: string;

  @Column({ type: 'char', length: 50 })
  experience: string;

  @ManyToOne(() => Utilizador, (utilizador) => utilizador.User_id)
  utilizador: Utilizador;

  // @OneToMany(
  //   () => Candidate_Candidacy,
  //   (candidate_candidacy) => candidate_candidacy.candidate,
  // )
  // candidate_candidacy: Candidate_Candidacy[];

  // @ManyToOne(() => Vacancy, (vacancy) => vacancy.candidate)
  // vacancy: Vacancy;

  constructor(candidate: Partial<Candidate>) {
    Object.assign(this, candidate);
  }
}
