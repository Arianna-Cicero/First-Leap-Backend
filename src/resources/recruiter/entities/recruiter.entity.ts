// import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recruiter extends Utilizador {
  @Column({ type: 'char', length: 50 })
  name: string;

  @Column({ type: 'char', length: 50 })
  position: string;

  // @ManyToOne(() => Utilizador, (utilizador) => utilizador.recruiter)
  // utilizador: Utilizador[];

  @ManyToOne(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.recruiter,
  )
  selectionProcess: SelectionProcess;

  constructor(recruiter: Partial<Recruiter>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, recruiter);
  }
}
