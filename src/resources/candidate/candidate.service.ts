import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidateService {
  
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async getCandidateExperience(candidateId: number): Promise<string> {
    const candidate = await this.candidateRepository.findOne(candidateId as any);
    
    return candidate.experience;
  }

  create(createCandidateDto: CreateCandidateDto) {
    return 'This action adds a new candidate';
  }

  findAll() {
    return `This action returns all candidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
