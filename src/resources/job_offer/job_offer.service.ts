import { Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job_offer.dto';
import { UpdateJobOfferDto } from './dto/update-job_offer.dto';
import { EntityManager, Repository } from 'typeorm';
import { JobOffer } from './entities/job_offer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectRepository(JobOffer)
    private readonly jobofferRepository: Repository<JobOffer>,
    private readonly entityManger: EntityManager,
  ) {}
  async create(createJobOfferDto: CreateJobOfferDto) {
    const joboffer = new JobOffer(createJobOfferDto);
    await this.entityManger.save(joboffer);
    return 'Oferta de trabalho criada!!!';
  }

  async findAll() {
    return this.jobofferRepository.find() ? 'si' : 'no';
  }

  async findOne(id: number) {
    return this.jobofferRepository.find({
      where: {
        JO_id: id,
      },
    });
  }

  async update(id: number, updateJobOfferDto: UpdateJobOfferDto) {
    const update = new JobOffer(updateJobOfferDto);
    await this.jobofferRepository.save(update);
    return `Oferta de ID #${id} modificada`;
  }

  async remove(id: number) {
    return this.jobofferRepository.delete(id);
  }
}
