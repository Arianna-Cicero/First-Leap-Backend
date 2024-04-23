import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostalCode {
    @PrimaryGeneratedColumn({ type: 'int' })
    pc : number;

    @Column({ type: 'char', length: 50 })
    localidade : string;

    constructor (postal_code: Partial<PostalCode>) {
        Object.assign(this, postal_code)
    }
}
