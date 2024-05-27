import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('emailverification')
export class Emailverification {
  @PrimaryGeneratedColumn({ type: 'int' })
  email_ver_id: number;

  @Column({ type: 'int' })
  Verification_code: number;

  @Column({ type: 'timestamp' })
  expiry_datetime: Date;

  @OneToOne(() => Utilizador, (utilizador) => utilizador.emailVerification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  utilizador: Utilizador;

  constructor(emailverification: Partial<Emailverification>) {
    Object.assign(this, emailverification);
  }
}
