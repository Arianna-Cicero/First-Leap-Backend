import { TypeSelectionProcess } from '@src/resources/type_selection_process/entities/type_selection_process.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('challenge')
export class Challenge {
  @PrimaryGeneratedColumn()
  challenge_id: number;

  @Column({ type: 'varchar', length: 255 })
  challenge_title: string;

  @Column({ type: 'text' })
  challenge_description: string;

  @Column({ type: 'json' })
  test_cases: { input: string; expectedOutput: any }[];

  @Column({ type: 'int' })
  time_limit: number;

  @ManyToOne(() => TypeSelectionProcess, (type) => type.challenge)
  type: TypeSelectionProcess;
}
