import { Utilizador } from "src/resources/utilizador/entities/utilizador.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recruiter {

    @PrimaryGeneratedColumn({type: 'int'})
    recruiter_id : number;

    @Column({type: 'char', length: 50})
    name : string;

    @Column({type: 'char', length: 50})
    position: string;

    @ManyToOne(() => Utilizador, (utilizador) => utilizador.recruiter)
    utilizador: Utilizador[];


    constructor (recruiter: Partial<Recruiter>) {
        Object.assign(this, recruiter)
    }
}
