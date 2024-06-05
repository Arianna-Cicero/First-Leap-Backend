import { Challenge } from '@src/resources/challenges/entities/challenge.entity';
import { WrittenTest } from '@src/resources/written_tests/entities/written_test.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Challenge, (challenge) => challenge.type)
  challenge: Challenge[];

  @OneToMany(() => WrittenTest, (writtenTests) => writtenTests.typeTypeSpId)
  writtenTests: WrittenTest[];

  constructor(type_selection_process: Partial<TypeSelectionProcess>) {
    Object.assign(this, type_selection_process);
  }
}
