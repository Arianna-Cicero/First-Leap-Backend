import { SelectionPhase } from '@src/resources/selection_phase/entities/selection_phase.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type_selection_process')
export class TypeSelectionProcess {
  @PrimaryGeneratedColumn()
  type_sp_id: number;

  @Column()
  description: string;

  @OneToOne(() => SelectionPhase, (selectionPhase) => selectionPhase.type_sd)
  selectionPhase: SelectionPhase;

  constructor(type_selection_process: Partial<TypeSelectionProcess>) {
    Object.assign(this, type_selection_process);
  }
}
