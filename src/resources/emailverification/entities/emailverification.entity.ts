import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emailverification')
export class Emailverification {
  @PrimaryGeneratedColumn({ type: 'int' })
  email_ver_id: number;

  @Column({ type: 'int' })
  Verification_code: number;

  @Column({ type: Date })
  expiry_datetime: Date;

  @OneToMany(() => Utilizador, (utilizador) => utilizador.emailverification)
  utilizador: Utilizador[];

  constructor(emailverification: Partial<Emailverification>) {
    Object.assign(this, emailverification);
  }
}
