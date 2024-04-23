import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    constructor (address: Partial<Address>) {
        Object.assign(this, address)
    }
}
