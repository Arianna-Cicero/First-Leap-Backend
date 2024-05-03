import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import { CreateSelectionprocessDto } from '../dto/create-selection_process.dto';
import { Vacancy } from 'src/resources/vancancy/entities/vacancy.entity';
import { SelectionPhase } from 'src/resources/selection_phase/entities/selection_phase.entity';
import { CreateSelectionphaseDto } from 'src/resources/selection_phase/dto/create-selection_phase.dto';

@Entity()
export class SelectionProcess {
  @PrimaryGeneratedColumn({ type: 'int' })
  SP_id: number;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'char', length: 250 })
  vacancies: string;

  @Column({ type: 'char', length: 250 })
  phase: string;



  @ManyToOne(() =>  Recruiter,  recruiter =>  recruiter.selectionProcess)
    recruiter:  Recruiter;
  @ManyToOne(() => Vacancy, vacancy => vacancy.selectionProcess)
    vacancy: Vacancy;
  @OneToMany(() => SelectionPhase, selectionPhase => selectionPhase.selectionProcess)
    selectionPhases: SelectionPhase[];
  
  constructor (selection_process: Partial<SelectionProcess>) {
    Object.assign(this, selection_process)
  }

  selectionPhase: CreateSelectionphaseDto;
}

