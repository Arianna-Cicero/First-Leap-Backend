import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn({ type: 'int' })
  vacancy_id: number;

  @Column({ type: 'char', length: 50 })
  title: string;

  @Column({ type: 'char', length: 50 })
  description: string;

  // @OneToMany(() => Candidate, (candidate) => candidate.vacancy)
  // candidate: Candidate[];
}
