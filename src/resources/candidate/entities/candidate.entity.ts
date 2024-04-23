import { Utilizador } from "src/resources/utilizador/entities/utilizador.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn({ type: 'int' })
    candidate_id : number;

    @Column({type : 'blob'})
    cv : Blob; // Não sei se funciona

    @Column({ type: 'char', length: 50 })
    skills : string;

    @Column({ type: 'char', length: 50 })
    experience : string;

    // @ManyToOne(() => Utilizador, (utilizador) => utilizador.User_id)
    // utilizador : Utilizador

    constructor (candidate: Partial<Candidate>) {
        Object.assign(this, candidate)
    }

}
