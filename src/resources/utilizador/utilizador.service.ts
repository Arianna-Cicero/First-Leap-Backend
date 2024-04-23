import { Injectable } from '@nestjs/common';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';
import { EntityManager } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';

@Injectable()
export class UtilizadorService {
  constructor (private readonly entityManager : EntityManager){}

  async create(createUtilizadorDto: CreateUtilizadorDto) {
    const utilizador = new Utilizador(createUtilizadorDto);
    await this.entityManager.save(utilizador);
  }

  findAll() {
    return `This action returns all utilizador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utilizador`;
  }

  update(id: number, updateUtilizadorDto: UpdateUtilizadorDto) {
    return `This action updates a #${id} utilizador`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilizador`;
  }
}
