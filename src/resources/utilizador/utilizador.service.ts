import { Injectable } from '@nestjs/common';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';
import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/bcrypt';

@Injectable()
export class UtilizadorService {
  constructor (
    private readonly entityManager: EntityManager,
    @InjectRepository(Utilizador) private userRepository: Repository <Utilizador>,
  ){}

  async create(createUtilizadorDto: CreateUtilizadorDto) {
    const password = encodePassword(createUtilizadorDto.password);
    const utilizador = new Utilizador({... createUtilizadorDto, password});
    await this.entityManager.save(utilizador);
  }

  async findUserByUsername(username: string) {
    const options: FindOneOptions = { where: { username } };
    return this.userRepository.findOne(options);
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
