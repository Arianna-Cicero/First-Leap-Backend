import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Candidacy {
    @PrimaryGeneratedColumn({ type: 'int' })
    Candidacy_id : number;

    constructor (candidacy: Partial<Candidacy>) {
        Object.assign(this, candidacy)
    }
}
