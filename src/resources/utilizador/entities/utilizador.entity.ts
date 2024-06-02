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

  @Column({ type: 'char', length: 50, nullable: true })
  name: string;

  @Column({ type: 'char', length: 50, nullable: true })
  username: string;

  @Column({ type: 'char', length: 60, nullable: true })
  password: string;

  @Column({ type: 'int', nullable: true })
  number: number;

  @Column({ type: 'char', length: 50, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'boolean', default: false, nullable: true })
  verificado: boolean;

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
