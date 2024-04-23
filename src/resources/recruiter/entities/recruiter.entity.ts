import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recruiter {

    @PrimaryGeneratedColumn()
    recruiter_id : number;

    @Column()
    name : string;

    @Column()
    position: string;

    constructor (recruiter: Partial<Recruiter>) {
        Object.assign(this, recruiter)
    }
}
