import { Injectable } from '@nestjs/common';
import { CreateSelectionPhaseDto } from './dto/create-selection_phase.dto';
import { UpdateSelectionPhaseDto } from './dto/update-selection_phase.dto';

@Injectable()
export class SelectionPhaseService {
  create(createSelectionPhaseDto: CreateSelectionPhaseDto) {
    return 'This action adds a new selectionPhase';
  }

  findAll() {
    return `This action returns all selectionPhase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selectionPhase`;
  }

  update(id: number, updateSelectionPhaseDto: UpdateSelectionPhaseDto) {
    return `This action updates a #${id} selectionPhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} selectionPhase`;
  }
}
