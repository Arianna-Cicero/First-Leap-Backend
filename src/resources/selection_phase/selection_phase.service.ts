import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSelectionphaseDto } from './dto/create-selection_phase.dto';
import { UpdateSelectionphaseDto } from './dto/update-selection_phase.dto';
import { SelectionPhase } from './entities/selection_phase.entity';
import { EntityManager, Repository } from 'typeorm';
import { TypeSelectionProcessService } from '../type_selection_process/type_selection_process.service';

@Injectable()
export class SelectionPhaseService {
  constructor(
    @InjectRepository(SelectionPhase)
    private readonly selectionPhaseRepo: Repository<SelectionPhase>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createSelectionphaseDto: CreateSelectionphaseDto) {
    const phase = new SelectionPhase(createSelectionphaseDto);
    await this.entityManager.save(phase);
    return phase;
  }

  async findAll() {
    return await this.selectionPhaseRepo.find();
  }

  async findOne(id: number) {
    const phase = await this.selectionPhaseRepo.findOne({ where: { SPH: id } });
    if (!phase) {
      throw new NotFoundException(`SelectionPhase with id ${id} not found`);
    }
    return phase;
  }

  async update(id: number, updateSelectionphaseDto: UpdateSelectionphaseDto) {
    const phase = await this.findOne(id);
    if (!phase) {
      throw new NotFoundException(`SelectionPhase with id ${id} not found`);
    }
    Object.assign(phase, updateSelectionphaseDto);

    await this.selectionPhaseRepo.save(phase);
    return phase;
  }
  async remove(id: number) {
    const phase = await this.findOne(id);
    if (!phase) {
      throw new NotFoundException(`SelectionPhase with id ${id} not found`);
    }
    await this.selectionPhaseRepo.delete(id);
    return { deleted: true };
  }
}
