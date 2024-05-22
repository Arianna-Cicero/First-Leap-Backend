// import { Admin } from 'src/resources/admin/entities/admin.entity';
import { Address } from 'src/resources/address/entities/address.entity';
import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';
// import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('utilizador')
export class Utilizador {
  @PrimaryGeneratedColumn({ type: 'int' })
  User_id: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column({ type: 'char', length: 50 })
  username: string;

  @Column({ type: 'char', length: 50 })
  password: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'char', length: 50 })
  email: string;

  @Column({ type: 'date' })
  birth_date: Date;

  // @OneToMany(() => Candidate, (candidate) => candidate.utilizador)
  // candidate: Candidate[];

  // @OneToMany(() => Admin, (admin) => admin.utilizador)
  // admin: Admin[];

  // @OneToMany(() => Recruiter, (recruiter) => recruiter.utilizador)
  // recruiter: Recruiter[];

  @OneToMany(() => Address, (address) => address.utilizador)
  address: Address[];

  @ManyToOne(
    () => Emailverification,
    (emailverification) => emailverification.utilizador,
  )
  emailverification: Emailverification;

  constructor(utilizador: Partial<Utilizador>) {
    Object.assign(this, utilizador);
  }
}
