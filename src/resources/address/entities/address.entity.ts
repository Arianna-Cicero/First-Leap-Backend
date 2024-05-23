import { Test, TestingModule } from '@nestjs/testing';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from 'src/resources/company/entities/company.entity';
import { PostalCode } from 'src/resources/postal_code/entities/postal_code.entity';
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn({ type: 'int' })
  address_id: number;

  @Column({ type: 'char', length: 50 })
  street: string;

  @Column({ type: 'char', length: 20 })
  city: string;

  @Column({ type: 'char', length: 20 })
  state: string;

  @Column({ type: 'char', length: 20 })
  country: string;

  @ManyToOne(() => PostalCode, (postalcode) => postalcode.address)
  postalcode: PostalCode;

  @ManyToOne(() => Company, (company) => company.address)
  company: Company;

  @ManyToOne(() => Utilizador, (utilizador) => utilizador.address)
  utilizador: Utilizador;

  constructor(address: Partial<Address>) {
    Object.assign(this, address);
  }
}
