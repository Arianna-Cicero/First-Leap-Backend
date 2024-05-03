import { Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createRecruiterDto: CreateRecruiterDto) {
    const recruiter = new Recruiter(createRecruiterDto);
    await this.entityManager.save(recruiter);
    return 'Recrutador criado';
  }

  async findAll() {
    return await this.recruiterRepository.find();
  }

  async findOne(id: number) {
    return await this.recruiterRepository.findOne({
      where: { recruiter_id: id },
    });
  }

  async update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    return `This action updates a #${id} recruiter`;
  }

  async remove(id: number) {
    return await this.recruiterRepository.delete(id);
  }
}
