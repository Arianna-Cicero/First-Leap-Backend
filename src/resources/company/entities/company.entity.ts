import { Address } from 'src/resources/address/entities/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(company: Partial<Company>) {
    Object.assign(this, company);
  }
}
