import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn({ type: 'int' })
    company_id : number;

    @Column({ type: 'char', length: 32 })
    name: string;

    @Column({ type: 'char', length: 50 })
    number: string;

    constructor (company: Partial<Company>) {
        Object.assign(this, company)
    }
}
