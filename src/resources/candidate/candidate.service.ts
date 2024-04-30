import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CandidateService {
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

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  async remove(id: number) {
    return await this.candidateRepository.delete(id);
  }
}
