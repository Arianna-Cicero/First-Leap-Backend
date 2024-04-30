import { Candidate_Candidacy } from 'src/resources/candidate_candidacy/entities/candidate_candidacy.entity';
import { Result } from 'src/resources/result/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { CreateSelectionprocessDto } from 'src/resources/selection_process/dto/create-selection_process.dto'; // Import the DTO

@Entity()
export class Candidacy {
    @PrimaryGeneratedColumn({ type: 'int' })
    Candidacy_id : number;

    constructor (candidacy: Partial<Candidacy>) {
        Object.assign(this, candidacy)
    }

    @ManyToOne(() => Result, (result) => result.candidacy)
    result: Result 

    @OneToMany(() => Candidate_Candidacy, (candidate_candidacy) => candidate_candidacy.candidacy)
    candidate_candidacy: Candidate_Candidacy[];

    // Add the selectionProcess property (not tied to the database)
    selectionProcess: CreateSelectionprocessDto;
}