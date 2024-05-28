import { Injectable } from '@nestjs/common';
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
    return 'Recrutador criado';
  }

  async findAll() {
    return await this.recruiterRepository.find();
  }

  async findOne(id: number) {
    return await this.recruiterRepository.findOne({
      where: { User_id: id },
    });
  }

  async update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    return `This action updates a #${id} recruiter`;
  }

  async remove(id: number) {
    return await this.recruiterRepository.delete(id);
  }
}
