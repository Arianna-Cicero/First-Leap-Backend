import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type_selection_process')
export class TypeSelectionProcess {
  @PrimaryGeneratedColumn()
  type_sp_id: number;

  @Column()
  description: string;

  @OneToOne(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.type_sp,
  )
  selectionProcess: SelectionProcess[];

  constructor(type_selection_process: Partial<TypeSelectionProcess>) {
    Object.assign(this, type_selection_process);
  }
}
