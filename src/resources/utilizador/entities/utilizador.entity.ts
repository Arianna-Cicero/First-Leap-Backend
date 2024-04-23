import { Candidate } from "src/resources/candidate/entities/candidate.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Utilizador {
    @PrimaryGeneratedColumn()
    User_id : number;

    @Column({nullable : false})
    name : string;

    @Column({nullable : false})
    username : string;

    @Column({nullable : false})
    password : string;

    @Column({nullable : false})
    permisson : number;

    @Column({nullable: false})
    number: number;

    @Column({nullable : false})
    email : string;

    @Column({nullable : false})
    birth_date : Date;

    candidate: Candidate

    constructor (utilizador: Partial<Utilizador>) {
        Object.assign(this, utilizador)
    }
}
