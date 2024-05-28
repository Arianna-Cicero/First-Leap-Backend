import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(
    createCandidateDto: CreateCandidateDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ) {
    const candidate = new Candidate(createCandidateDto, createUtilizadorDto);
    await this.entityManager.save(candidate);
    return 'Candidato creado';
  }

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find();
  }

  async findOne(id: number) {
    return await this.candidateRepository.findOne({
      where: { User_id: id },
    });
  }

  async findCandidateEmail(id: number) {
    return await this.candidateRepository.findOne({
      where: { User_id: id },
      select: ['email'],
    });
  }

  async findCVById(candidateId: number): Promise<Buffer> {
    const candidate = await this.candidateRepository.findOne({
      where: { User_id: candidateId },
      select: ['cv'],
    });
    if (candidate && candidate.cv) {
      return candidate.cv;
    } else {
      throw new Error('CV not found for candidate');
    }
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    await this.candidateRepository.update(id, updateCandidateDto);
    this.candidateRepository.find;
    const updatedCandidate = await this.candidateRepository.findOne({
      where: { User_id: id },
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
