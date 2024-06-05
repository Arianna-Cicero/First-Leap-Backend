import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { CandidateService } from 'src/resources/candidate/candidate.service'; // Replace with your actual entity
import { CreateSelectionphaseDto } from './dto/create-selection_phase.dto';
import { UpdateSelectionphaseDto } from './dto/update-selection_phase.dto';
import { SelectionProcessService } from 'src/resources/selection_process/selection_process.service'; // Import the SelectionProcessService

@Injectable()
export class SelectionPhaseService {
  constructor() // private readonly selectionProcessService: SelectionProcessService, // private readonly candidateService: CandidateService, // private readonly selectionProcessRepository: Repository<SelectionProcess>, // @InjectRepository(SelectionProcess)
  {}

  // async processSelectionPhase(createSelectionphaseDto: CreateSelectionphaseDto) {
  //     // Retrieve the selection process ID from the DTO
  //     const selectionProcessId = createSelectionphaseDto.Selection_ProcessSP_id;

  //     // Retrieve the selection process entity by ID
  //     const selectionProcess = await this.selectionProcessService.findOne(selectionProcessId);
  //     // Check if the selection process exists
  //     if (!selectionProcess) {
  //         // Open exception
  //     }

  //     // Access the vacancy ID from the selection process entity
  //     const vacancyId = selectionProcess.vacancy.id;

  //     // Access the candidate ID from the vacancy entity
  //     const candidateId = selectionProcess.vacancy.candidate.id;

  //     // Retrieve candidate's experience information from the CandidateService
  //     const candidateExperience = await this.candidateService.getCandidateExperience(candidateId);

  //     // Use the candidate's experience information as needed in the selection phase logic
  //     // For example:
  //     if (candidateExperience === 'Experienced') {
  //         // Candidate is experienced
  //         // Perform other selection phase operations
  //     } else {
  //         // Candidate is not experienced
  //         // Perform other selection phase operations
  //     }
  // }
  create(createSelectionphaseDto: CreateSelectionphaseDto) {
    return 'This action adds a new recruiter';
  }

  findAll() {
    return `This action returns all recruiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruiter`;
  }

  update(id: number, updateSelectionphaseDto: UpdateSelectionphaseDto) {
    return `This action updates a #${id} recruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruiter`;
  }
}
