import { Injectable } from '@nestjs/common';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionprocessDto } from './dto/update-selection_process.dto';
//import { SelectionProcess } from './entities/selection_process.entity';
//import { SelectionPhase } from '../selection_phase/entities/selection_phase.entity';
import { SelectionPhaseService } from 'src/resources/selection_phase/selection_phase.service';


  
@Injectable()
export class SelectionProcessService {
  
    constructor(
        private readonly selectionPhaseService: SelectionPhaseService, // Inject the SelectionProcessService
    ) {}
    async create(createSelectionprocessDto: CreateSelectionprocessDto) {
        // Create an instance of CreateCandidacyDto (if needed)
        //const candidacy = new CreateCandidacyDto();

        // Create a new selection process using the SelectionProcessService
        const newSelectionProcess = await this.selectionPhaseService.create(createSelectionprocessDto.selectionPhase); // Assuming selection process data is included in the candidacy DTO

        // Perform any necessary operations with the instances

        return 'This action adds a new candidacy and selection process';
    }



    findAll() {
    return `This action returns all Selectionprocess`;
    }

    findOne(id: number) {
    return `This action returns a #${id} Selectionprocess`;
    }

    update(id: number, updateSelectionprocessDto: UpdateSelectionprocessDto) {
    return `This action updates a #${id} Selectionprocess`;
    }

    remove(id: number) {
    return `This action removes a #${id} Selectionprocess`;
    }

    

}


