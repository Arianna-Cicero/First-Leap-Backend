import { Injectable } from '@nestjs/common';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

@Injectable()
export class UtilizadorService {
  create(createUtilizadorDto: CreateUtilizadorDto) {
    return 'This action adds a new utilizador';
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
