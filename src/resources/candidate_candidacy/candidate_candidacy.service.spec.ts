import { Test, TestingModule } from '@nestjs/testing';
import { CandidateCandidacyService } from './candidate_candidacy.service';

describe('CandidateCandidacyService', () => {
  let service: CandidateCandidacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateCandidacyService],
    }).compile();

    service = module.get<CandidateCandidacyService>(CandidateCandidacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
