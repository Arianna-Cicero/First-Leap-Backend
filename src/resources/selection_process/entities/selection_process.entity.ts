import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class SelectionProcess extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  SP_id: number;

  @Column({ type: 'char', length: 250 })
  description: string;

  @Column({ type: 'int' })
  vacancies: number;

  @Column({ type: 'int' })
  phase: number;
}
