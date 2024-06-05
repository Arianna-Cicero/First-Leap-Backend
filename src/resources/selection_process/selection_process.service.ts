import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionprocessDto } from './dto/update-selection_process.dto';
import { SelectionProcess } from './entities/selection_process.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SelectionProcessService {
  constructor(
    @InjectRepository(SelectionProcess)
    private readonly spRepository: Repository<SelectionProcess>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createSelectionprocessDto: CreateSelectionprocessDto) {
    const newSelectionProcess = new SelectionProcess(createSelectionprocessDto);
    const saveSP = await this.entityManager.save(newSelectionProcess);

    return saveSP;
  }

  async findAll() {
    return await this.spRepository.find();
  }

  async findOne(id: number) {
    return this.spRepository.findOne({ where: { SP_id: id } });
  }

  async update(
    id: number,
    updateSelectionprocessDto: UpdateSelectionprocessDto,
  ) {
    const selectionProcess = await this.findOne(id);
    if (!selectionProcess) {
      throw new NotFoundException(`SelectionProcess with id ${id} not found`);
    }
    Object.assign(selectionProcess, updateSelectionprocessDto);
    await this.spRepository.save(selectionProcess);
    return selectionProcess;
  }

  async remove(id: number) {
    return await this.entityManager.remove(id);
  }
}
