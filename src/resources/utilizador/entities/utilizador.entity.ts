import { Address } from 'src/resources/address/entities/address.entity';
import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('utilizador')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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

  @Column({ type: 'boolean', default: false })
  verificado: Boolean;

  @OneToMany(() => Address, (address) => address.utilizador)
  address: Address[];

  @OneToOne(
    () => Emailverification,
    (emailVerification) => emailVerification.utilizador,
    { cascade: true, eager: true },
  )
  emailVerification: Emailverification;

  constructor(utilizador: Partial<Utilizador>) {
    Object.assign(this, utilizador);
  }
}
