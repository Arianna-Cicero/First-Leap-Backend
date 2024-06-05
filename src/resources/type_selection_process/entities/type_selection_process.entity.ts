<<<<<<< HEAD
import { SelectionPhase } from '@src/resources/selection_phase/entities/selection_phase.entity';
=======
import { Challenge } from '@src/resources/challenges/entities/challenge.entity';
import { WrittenTest } from '@src/resources/written_tests/entities/written_test.entity';
>>>>>>> origin/master
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

  @OneToOne(() => SelectionPhase, (selectionPhase) => selectionPhase.type_sd)
  selectionPhase: SelectionPhase;

  @OneToMany(() => Challenge, (challenge) => challenge.type)
  challenge: Challenge[];

  @OneToMany(() => WrittenTest, (writtenTests) => writtenTests.typeTypeSpId)
  writtenTests: WrittenTest[];

  constructor(type_selection_process: Partial<TypeSelectionProcess>) {
    Object.assign(this, type_selection_process);
  }
}
