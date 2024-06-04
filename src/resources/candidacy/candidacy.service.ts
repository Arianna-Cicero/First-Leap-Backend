import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';
import { UpdateCandidacyDto } from './dto/update-candidacy.dto';
import { JobOfferService } from '../job_offer/job_offer.service';
import { CandidateService } from '../candidate/candidate.service';
import { EntityManager } from 'typeorm';
import { Candidacy } from './entities/candidacy.entity';
import { Candidate_Candidacy } from '../candidate_candidacy/entities/candidate_candidacy.entity';

@Injectable()
export class CandidacyService {
  constructor(
    private readonly jobOfferService: JobOfferService,
    private readonly candidateService: CandidateService,
    private readonly entityManager: EntityManager,
  ) {}

  async applyForJob(candidateId: number, jobId: number): Promise<Candidacy> {
    const candidate = await this.candidateService.findOne(candidateId);
    const jobOffer = await this.jobOfferService.findOne(jobId);

    if (!candidate || !jobOffer) {
      throw new NotFoundException('Candidate or Job Offer not found');
    }

    const newCandidacy = new Candidacy({
      status: 'Submitted',
      joboffer: jobOffer,
    });

    const savedCandidacy = await this.entityManager.save(newCandidacy);

    const candidateCandidacy = new Candidate_Candidacy();
    candidateCandidacy.candidate = candidate;
    candidateCandidacy.candidacy = savedCandidacy;

    await this.entityManager.save(candidateCandidacy);

    return savedCandidacy;
  }

  async create(createCandidacyDto: CreateCandidacyDto) {
    return 'This action adds a new candidacy and selection process';
  }

  findAll() {
    return `This action returns all candidacy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidacy`;
  }

  update(id: number, updateCandidacyDto: UpdateCandidacyDto) {
    return `This action updates a #${id} candidacy`;
  }
}
