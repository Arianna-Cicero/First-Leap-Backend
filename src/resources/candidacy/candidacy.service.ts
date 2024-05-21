import { Injectable } from '@nestjs/common';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';
import { UpdateCandidacyDto } from './dto/update-candidacy.dto';
import { SelectionProcessService } from 'src/resources/selection_process/selection_process.service';

@Injectable()
export class CandidacyService {
  constructor() {} // private readonly selectionProcessService: SelectionProcessService, // Inject the SelectionProcessService
  async create(createCandidacyDto: CreateCandidacyDto) {
    // Create an instance of CreateCandidacyDto (if needed)
    //const candidacy = new CreateCandidacyDto();

    // Create a new selection process using the SelectionProcessService
    // const newSelectionProcess = await this.selectionProcessService.create(
    // createCandidacyDto.selectionProcess,
    // ); // Assuming selection process data is included in the candidacy DTO

    // Perform any necessary operations with the instances

    return 'This action adds a new candidacy and selection process';
  }

  findAll() {
    return `This action returns all candidacy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidacy`;
  }

  update(id: number, updateCandidacyDto: UpdateCandidacyDto) {
    return `This action updates a #${id} candidacy`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidacy`;
  }
}
