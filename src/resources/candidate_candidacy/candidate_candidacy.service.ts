import { Injectable } from '@nestjs/common';
import { CreateCandidateCandidacyDto } from './dto/create-candidate_candidacy.dto';
import { UpdateCandidateCandidacyDto } from './dto/update-candidate_candidacy.dto';

@Injectable()
export class CandidateCandidacyService {
  create(createCandidateCandidacyDto: CreateCandidateCandidacyDto) {
    return 'This action adds a new candidateCandidacy';
  }

  findAll() {
    return `This action returns all candidateCandidacy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidateCandidacy`;
  }

  update(id: number, updateCandidateCandidacyDto: UpdateCandidateCandidacyDto) {
    return `This action updates a #${id} candidateCandidacy`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} candidateCandidacy`;
  // }
}
