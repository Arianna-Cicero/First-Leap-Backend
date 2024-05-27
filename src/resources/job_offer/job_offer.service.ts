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
    private readonly entityManager: EntityManager,
  ) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    const jobOffer = this.entityManager.create(JobOffer, createJobOfferDto);
    return await this.entityManager.save(JobOffer, jobOffer);
  }

  async findAll() {
    return this.jobofferRepository.find();
  }

  async findOne(id: number) {
    return this.jobofferRepository.findOne({
      where: {
        JO_id: id,
      },
    });
  }

  async findDeadlineById(joId: number): Promise<Date | null> {
    const jobOffer = await this.jobofferRepository.findOne({
      where: { JO_id: joId },
      select: ['deadline'],
    });
    if (jobOffer) {
      return jobOffer.deadline;
    } else {
      return null;
    }
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

  // async remove(id: number) {
  //   return this.jobofferRepository.delete(id);
  // }
}
