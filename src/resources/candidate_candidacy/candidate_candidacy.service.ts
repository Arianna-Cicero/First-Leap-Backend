import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateCandidacyDto } from './dto/create-candidate_candidacy.dto';
import { UpdateCandidateCandidacyDto } from './dto/update-candidate_candidacy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate_Candidacy } from './entities/candidate_candidacy.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CandidateCandidacyService {
  constructor(
    @InjectRepository(Candidate_Candidacy)
    private readonly canRepo: Repository<Candidate_Candidacy>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCandidateCandidacyDto: CreateCandidateCandidacyDto) {
    const newCC = new Candidate_Candidacy(createCandidateCandidacyDto);
    const savedCC = await this.entityManager.save(newCC);
    return savedCC;
  }

  async findAll() {
    return await this.canRepo.find();
  }

  async findOne(id: number) {
    return await this.canRepo.findOne({
      where: { Candidacy_Candidacy_id: id },
    });
  }

  async update(
    id: number,
    updateCandidateCandidacyDto: UpdateCandidateCandidacyDto,
  ) {
    const candidate_candidacy = await this.canRepo.findOne({
      where: { Candidacy_Candidacy_id: id },
    });
    if (!candidate_candidacy)
      throw new NotFoundException(
        `Candidacy_Candidacy com id ${id} nao encontrado`,
      );
    Object.assign(candidate_candidacy, updateCandidateCandidacyDto);
    return await this.canRepo.save(candidate_candidacy);
  }

  async remove(id: number) {
    return this.canRepo.delete(id);
  }
}
