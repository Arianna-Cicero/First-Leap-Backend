import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Feedback } from 'src/resources/feedback/entities/feedback.entity';
import { TypeSelectionProcess } from '@src/resources/type_selection_process/entities/type_selection_process.entity';
//import { Candidate } from './candidate.entity';

@Entity('selection_phase')
export class SelectionPhase {
  @PrimaryGeneratedColumn({ type: 'int' })
  SPH: number;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'char', length: 250 })
  process: string;

  @OneToOne(
    () => TypeSelectionProcess,
    (typeSelectionProcess) => typeSelectionProcess.selectionPhase,
  )
  @JoinColumn({ name: 'type_sp_id' })
  type_sd: TypeSelectionProcess[];

  @ManyToOne(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.selectionPhases,
  )
  selectionProcess: SelectionProcess;

  @OneToMany(() => Feedback, (feedback) => feedback.SelectionPhase)
  feedback: Feedback[];

  constructor(selectionPhase: Partial<SelectionPhase>) {
    Object.assign(this, selectionPhase);
  }
}
