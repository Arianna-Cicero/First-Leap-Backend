import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  create(createCandidateDto: CreateCandidateDto) {
    return 'This action adds a new candidate';
  }

  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCandidateDto: CreateCandidateDto) {
    const candidate = new Candidate(createCandidateDto);
    await this.candidateRepository.save(candidate);
    return 'Candidato creado';
  }

  async findAll() {
    return await this.candidateRepository.find();
  }

  async findOne(id: number) {
    return await this.candidateRepository.findOne({
      where: { candidate_id: id },
    });
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    await this.candidateRepository.update(id, updateCandidateDto);
    this.candidateRepository.find;
    const updatedCandidate = await this.candidateRepository.findOne({
      where: { candidate_id: id },
    });
    if (!updatedCandidate) {
      throw new Error('candidato no encontrado');
    }
    return updatedCandidate;
  }

  async remove(id: number) {
    return await this.candidateRepository.delete(id);
  }
}
