import { Injectable } from '@nestjs/common';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';
import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { encodePassword } from 'src/auth/bcrypt';

@Injectable()
export class UtilizadorService {
  constructor(
    @InjectRepository(Utilizador)
    private userRepository: Repository<Utilizador>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUtilizadorDto: CreateUtilizadorDto) {
    // const password = encodePassword(createUtilizadorDto.password);
    const utilizador = new Utilizador({ ...createUtilizadorDto });
    await this.entityManager.save(utilizador);
  }

  async findUserByUsername(username: string) {
    const options: FindOneOptions = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({
      where: {
        User_id: id,
      },
    });
  }

  async update(
    id: number,
    updateUtilizadorDto: UpdateUtilizadorDto,
  ): Promise<Utilizador> {
    await this.userRepository.update(id, updateUtilizadorDto);
    const updatedUser = await this.userRepository.findOne({
      where: { User_id: id },
    });
    this.userRepository.find;
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  // async remove(id: number) {
  //   await this.userRepository.delete(id);
  //   return `utilizador de ID #${id} eliminado`;
  // }
}
