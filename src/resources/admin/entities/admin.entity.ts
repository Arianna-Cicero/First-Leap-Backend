import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn({ type: 'int'})
    admin : number;

    @Column({type: 'char', length: 50})
    position: string;

    constructor (admin: Partial<Admin>) {
        Object.assign(this, admin)
    }
}
