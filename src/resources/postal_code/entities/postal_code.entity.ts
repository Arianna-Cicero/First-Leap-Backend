import { Address } from 'src/resources/address/entities/address.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('postal_code')
export class PostalCode {
  @PrimaryGeneratedColumn({ type: 'int' })
  pc: number;

  @Column({ type: 'char', length: 50 })
  localidade: string;

  @OneToMany(() => Address, (address) => address.postalcode)
  address: Address[];

  constructor(postal_code: Partial<PostalCode>) {
    Object.assign(this, postal_code);
  }
}
