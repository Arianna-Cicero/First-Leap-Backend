import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Jobtype {
    @PrimaryGeneratedColumn({ type: 'int' })
    type_id: number;
  
    @Column({ type: 'char', length: 250 })
    jobtype_desc: string;
}
