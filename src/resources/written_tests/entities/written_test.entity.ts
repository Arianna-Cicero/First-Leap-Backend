import { TypeSelectionProcess } from '@src/resources/type_selection_process/entities/type_selection_process.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('written_tests')
export class WrittenTest {
  @PrimaryGeneratedColumn()
  written_test_id: number;

  @Column({ type: 'char', length: 250, default: '' })
  question_text: string;

  @Column({ type: 'int' })
  difficulty_level: number;

  @Column({ type: 'char', length: 250, default: '' })
  subject_area: string;

  @Column({ type: 'char', length: 250, default: '' })
  answer: string;

  @ManyToOne(() => TypeSelectionProcess, (type) => type.writtenTests)
  typeTypeSpId: TypeSelectionProcess;

  constructor(writtentests: Partial<WrittenTest>) {
    Object.assign(this, writtentests);
  }
}
