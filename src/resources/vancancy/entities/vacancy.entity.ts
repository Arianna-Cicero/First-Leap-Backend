import { Candidate } from 'src/resources/candidate/entities/candidate.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn({ type: 'int' })
  vacancy_id: number;

  @Column({ type: 'char', length: 50 })
  title: string;

  @Column({ type: 'char', length: 50 })
  description: string;

  //@OneToMany(() => Candidate, (candidate) => candidate.vacancy)
  //candidate: Candidate[];

  @OneToMany(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.vacancy,
  )
  selectionProcess: SelectionProcess[];

  // @OneToMany(() => Candidate, candidate => candidate.vacancy)
  // candidate: Candidate;
}
