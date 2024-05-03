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
    return this.jobofferRepository.findOne({
      where: {
        JO_id: id,
      },
    });
  }

  async update(id: number, updateJobOfferDto: UpdateJobOfferDto) {
    await this.jobofferRepository.update(id, updateJobOfferDto);
    const updatedJobOffer = await this.jobofferRepository.findOne({
      where: { JO_id: id },
    });
    await this.jobofferRepository.find;
    if (!updatedJobOffer) {
      throw new Error('Job offer nao econtrada');
    }
    return updatedJobOffer;
  }

  async remove(id: number) {
    return this.jobofferRepository.delete(id);
  }
}
