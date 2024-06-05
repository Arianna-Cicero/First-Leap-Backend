import { Injectable, NotFoundException } from '@nestjs/common';
import { JobOfferService } from '../job_offer/job_offer.service';
import { CandidateService } from '../candidate/candidate.service';
import { EntityManager, Repository } from 'typeorm';
import { Candidacy } from './entities/candidacy.entity';
import { Candidate_Candidacy } from '../candidate_candidacy/entities/candidate_candidacy.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidacyService {
  constructor(
    @InjectRepository(Candidacy)
    private readonly candidacyService: Repository<Candidacy>,
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

  async findAll() {
    return await this.candidateService.findAll();
  }

  async findOne(id: number) {
    return this.candidacyService.findOne({ where: { Candidacy_id: id } });
  }

  async remove(id: number) {
    return await this.candidateService.remove(id);
  }
}
