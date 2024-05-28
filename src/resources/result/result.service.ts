import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { EntityManager, Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createResultDto: CreateResultDto) {
    const result = new Result(createResultDto);
    await this.entityManager.save(result);
    return `Novo result adicionado: #${result}`;
  }

  async findAll() {
    return await this.resultRepository.find();
  }

  // async findOne(id: number) {
  //   return await this.resultRepository.findOne(id);
  // }  
  
  // async update(id: number, updateResultDto: UpdateResultDto) {
  //   const result = await this.resultRepository.findOneOrFail(id);
  //   Object.assign(result, updateResultDto);
  //   await this.resultRepository.save(result);
  //   return result;
  // }
  
  
  async remove(id: number) {
    return await this.resultRepository.delete(id);
  }
}
