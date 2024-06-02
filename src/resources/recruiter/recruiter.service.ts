import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(
    createRecruiterDto: CreateRecruiterDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ) {
    const recruiter = new Recruiter(createRecruiterDto, createUtilizadorDto);
    await this.entityManager.save(recruiter);
    return recruiter;
  }

  async findAll() {
    return await this.recruiterRepository.find();
  }

  async findOne(id: number) {
    return await this.recruiterRepository.findOne({
      where: { User_id: id },
    });
  }

  async update(
    id: number,
    updateRecruiterDto: UpdateRecruiterDto,
  ): Promise<Recruiter | undefined> {
    const recruiter = await this.recruiterRepository.findOne({
      where: { User_id: id },
    });
    if (!recruiter) {
      throw new NotFoundException(`Recruiter with ID ${id} not found`);
    }
    Object.assign(recruiter, updateRecruiterDto);
    return await this.recruiterRepository.save(recruiter);
  }

  // async findOne(
  //   identifier: number | FindOneOptions<Recruiter>,
  // ): Promise<Recruiter | undefined> {
  //   if (typeof identifier === 'number') {
  //     return await this.recruiterRepository.findOne({
  //       where: { User_id: identifier },
  //     });
  //   } else {
  //     return await this.recruiterRepository.findOne(identifier);
  //   }
  // }

  async remove(id: number) {
    return await this.recruiterRepository.delete(id);
  }
}
