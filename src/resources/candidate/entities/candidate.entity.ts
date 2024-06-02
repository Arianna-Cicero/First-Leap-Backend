import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Vacancy } from 'src/resources/vancancy/entities/vacancy.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('candidate')
export class Candidate extends Utilizador {
  @Column({ type: 'blob', nullable: true })
  cv: Buffer;

  @Column({ type: 'char', length: 50, nullable: true })
  skills: string;

  @Column({ type: 'char', length: 50, nullable: true })
  experience: string;

  @OneToMany(
    () => Candidate_Candidacy,
    (candidate_candidacy) => candidate_candidacy.Candidate_candidate_id,
    { cascade: true, eager: true },
  )
  candidate_candidacy: Candidate_Candidacy[];

  @ManyToOne(() => Utilizador, { cascade: true, eager: true })
  utilizador: Utilizador;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.candidate)
  vacancy: Vacancy;

  constructor(candidate: Partial<Candidate>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, candidate);
  }
}
