import { Utilizador } from "src/resources/utilizador/entities/utilizador.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn({ type: 'int'})
    admin : number;

    @Column({type: 'char', length: 50})
    position: string;  

    @ManyToOne(() => Utilizador, (utilizador) => utilizador.admin)
    utilizador: Utilizador;

    constructor (admin: Partial<Admin>) {
        Object.assign(this, admin)
    }
}
