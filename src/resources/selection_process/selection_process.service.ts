import { Injectable } from '@nestjs/common';
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
    return `This action updates a #${id} Selectionprocess`;
  }

  async remove(id: number) {
    return await this.entityManager.remove(id);
  }
}
