import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { SelectionProcess } from './entities/selection_process.entity';
import { CreateSelectionProcessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionProcessDto } from './dto/update-selection_process.dto';

@Injectable()
export class SelectionProcessService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createSelectionProcessDto: CreateSelectionProcessDto,
  ): Promise<SelectionProcess> {
    const { description, vacancies, phase } = createSelectionProcessDto;
    const selectionProcess = new SelectionProcess();
    selectionProcess.description = description;
    selectionProcess.vacancies = vacancies;
    selectionProcess.phase = phase;

    return await this.entityManager.save(selectionProcess);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    data: SelectionProcess[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    const [data, totalCount] = await this.entityManager.findAndCount(
      SelectionProcess,
      {
        take: pageSize,
        skip: (page - 1) * pageSize,
      },
    );
    const totalPages = Math.ceil(totalCount / pageSize);
    return { data, totalCount, currentPage: page, totalPages };
  }

  async findOne(id: number): Promise<SelectionProcess | undefined> {
    return await this.entityManager.findOne(SelectionProcess, id as any);
  }

  async update(
    id: number,
    updateSelectionProcessDto: UpdateSelectionProcessDto,
  ): Promise<SelectionProcess | undefined> {
    const selectionProcess = await this.findOne(id);
    if (!selectionProcess) {
      return undefined;
    }
    const { description, vacancies, phase } = updateSelectionProcessDto;
    selectionProcess.description = description;
    selectionProcess.vacancies = vacancies;
    selectionProcess.phase = phase;

    return await this.entityManager.save(selectionProcess);
  }

  async remove(id: number): Promise<void> {
    await this.entityManager.delete(SelectionProcess, id);
  }
}
