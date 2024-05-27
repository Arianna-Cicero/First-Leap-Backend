import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job_type.dto';
import { UpdateJobTypeDto } from './dto/update-job_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from './entities/job_type.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class JobtypeService {
  constructor(
    @InjectRepository(JobType)
    private readonly jobtypeRepository: Repository<JobType>,
    private readonly entityManger: EntityManager,
  ) {}
  async create(createJobTypeDto: CreateJobTypeDto) {
    const jobtype = new JobType(createJobTypeDto);
    await this.entityManger.save(jobtype);
    return jobtype;
  }

  async findAll() {
    return this.jobtypeRepository.find();
  }

  async findOne(id: number) {
    return this.jobtypeRepository.findOne({
      where: {
        type_id: id,
      },
    });
  }

  async update(
    id: number,
    updateJobTypeDto: UpdateJobTypeDto,
  ): Promise<JobType> {
    await this.jobtypeRepository.update(id, updateJobTypeDto);
    const updatedType = await this.jobtypeRepository.findOne({
      where: { type_id: id },
    });
    this.jobtypeRepository.find;
    if (!updatedType) {
      throw new Error('Utilizador no encontrado');
    }
    return updatedType;
  }

  // async remove(id: number) {
  //   await this.jobtypeRepository.delete(id);
  //   return `jobtype de ID #${id} eliminado`;
  // }
}
