import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-jobtype.dto';
import { UpdateJobTypeDto } from './dto/update-jobtype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from './entities/jobtype.entity';
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
    return 'jobtype adicionada';
  }

  async findAll() {
    return this.jobtypeRepository.find();
  }

  async findOne(id: number) {
    return this.jobtypeRepository.find({
      where: {
        type_id: id,
      },
    });
  }

  async update(id: number, updateJobTypeDto: UpdateJobTypeDto) {
    const update = new JobType(updateJobTypeDto);
    await this.jobtypeRepository.save(update);
    return `jobtype de ID #${id} modificada`;
  }

  async remove(id: number) {
    return this.jobtypeRepository.delete(id);
  }
}
