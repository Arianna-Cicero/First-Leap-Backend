import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Emailverification {
  @PrimaryGeneratedColumn({ type: 'int' })
  email_ver_id: number;

  @Column({ type: 'int', length: 6 })
  Verification_code: number;

  @Column({ type: Date })
  expiry_datetime: Date;

  //   @OneToMany(() => Utilizador, (utilizador) => utilizador.emailverification)
  //   utilizador: Utilizador[];


    constructor (candidate: Partial<Candidate>) {
        Object.assign(this, candidate)
    }

}