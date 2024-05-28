import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { CreateSelectionprocessDto } from '../dto/create-selection_process.dto';
import { SelectionPhase } from 'src/resources/selection_phase/entities/selection_phase.entity';
import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';
import { TypeSelectionProcess } from 'src/resources/type_selection_process/entities/type_selection_process.entity';
// import { CreateSelectionphaseDto } from 'src/resources/selection_phase/dto/create-selection_phase.dto';

@Entity('selection_process')
export class SelectionProcess {
  @PrimaryGeneratedColumn({ type: 'int' })
  SP_id: number;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'int'})
  vacancies: number;

  @Column({ type: 'char', length: 250 })
  phase: number;

  @Column({ type: 'date' })
  starting_date: Date;

  @ManyToOne(() => JobOffer, (job_offer) => job_offer.selectionProcess)
  job_offer: JobOffer;

  @OneToMany(
    () => SelectionPhase,
    (selectionPhase) => selectionPhase.selectionProcess,
  )
  selectionPhases: SelectionPhase[];

  @OneToOne(() => TypeSelectionProcess, (type_sp) => type_sp.selectionProcess)
  type_sp: TypeSelectionProcess;

  constructor(selection_process: Partial<SelectionProcess>) {
    Object.assign(this, selection_process);
  }
}
