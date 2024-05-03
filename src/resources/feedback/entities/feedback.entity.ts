import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JobType } from 'src/resources/jobtype/entities/jobtype.entity';
import { SelectionPhase } from 'src/resources/selection_phase/entities/selection_phase.entity'; 

export class Feedback {
  @PrimaryGeneratedColumn({ type: 'int' })
  feedback_id: number;

  @Column({ type: 'char', length: 250 })
  feedback_desc: string;

  @ManyToOne(() => SelectionPhase, selectionPhase => selectionPhase.feedback)
  SelectionPhase: SelectionPhase;
}


