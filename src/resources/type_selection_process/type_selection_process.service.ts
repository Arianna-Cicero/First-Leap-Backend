import { Injectable } from '@nestjs/common';
import { CreateTypeSelectionProcessDto } from './dto/create-type_selection_process.dto';
import { UpdateTypeSelectionProcessDto } from './dto/update-type_selection_process.dto';
import { EntityManager, Repository } from 'typeorm';
import { TypeSelectionProcess } from './entities/type_selection_process.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeSelectionProcessService {
  constructor(
    @InjectRepository(TypeSelectionProcess)
    private readonly typeSPrepo: Repository<TypeSelectionProcess>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createTypeSelectionProcessDto: CreateTypeSelectionProcessDto) {
    const newTypesp = new TypeSelectionProcess(createTypeSelectionProcessDto);
    return await this.entityManager.save(newTypesp);
  }

  async findAll() {
    return this.typeSPrepo.find();
  }

  async findOne(id: number) {
    return await this.typeSPrepo.findOne({ where: { type_sp_id: id } });
  }

  async update(
    id: number,
    updateTypeSelectionProcessDto: UpdateTypeSelectionProcessDto,
  ) {
    return `This action updates a #${id} typeSelectionProcess`;
  }

  async remove(id: number) {
    return this.typeSPrepo.delete(id);
  }

  async Interview() {}
  async ProgrammingChallenge() {}
}
