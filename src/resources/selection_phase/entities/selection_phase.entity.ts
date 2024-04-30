import { Column, Entity, OneToMany,ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity'; 
import { Feedback } from 'src/resources/feedback/entities/feedback.entity';
//import { Candidate } from './candidate.entity'; 


@Entity()
export class SelectionPhase {
  @PrimaryGeneratedColumn({ type: 'int' })
  SPH: number;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'int'})
  order: number;

  @Column({ type: 'char', length: 250 })
  process: string;

  @ManyToOne(() => SelectionProcess, selectionProcess => selectionProcess.selectionPhases)
    selectionProcess: SelectionProcess;

  @OneToMany(() => Feedback, feedback => feedback.SelectionPhase)
  feedback: Feedback[];
}
