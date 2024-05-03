import { Candidacy } from 'src/resources/candidacy/entities/candidacy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn({ type: 'int' })
  result_id: number;

  @Column({ type: 'char', length: 50 })
  result_desc: string;

  @Column({ type: 'char', length: 255 })
  comments: string;

  @Column({ type: 'timestamp' })
  evaluation_date: Date;

  // @OneToMany(() => Candidacy, (candidacy) => candidacy.result)
  // candidacy: Candidacy[]
}
