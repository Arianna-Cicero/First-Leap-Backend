import { Address } from 'src/resources/address/entities/address.entity';
import { Recruiter } from 'src/resources/recruiter/entities/recruiter.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn({ type: 'int' })
  company_id: number;

  @Column({ type: 'char', length: 32 })
  name: string;

  @Column({ type: 'char', length: 50 })
  number: string;

  @OneToMany(() => Address, (address) => address.company)
  address: Address[];

  // @ManyToOne((type) => Recruiter, (recruiter) => recruiter.User_id)
  // @JoinTable()
  // recruiter: Promise<Recruiter>;

  constructor(company: Partial<Company>) {
    Object.assign(this, company);
  }
}
