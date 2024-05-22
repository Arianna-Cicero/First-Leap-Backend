import { Test, TestingModule } from '@nestjs/testing';
import { CandidacyController } from './candidacy.controller';

describe('CandidacyController', () => {
  let controller: CandidacyController;

  const mockCandidacyService = {
    create: jest.fn(dto => ({
      candidacy_id: Date.now(),
      ...dto
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidacyController],
    }).compile();

    controller = module.get<CandidacyController>(CandidacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a candidacy', async () => {
    const dto = {
      Candidacy_id : 1,
    }

    const createdCandidacy = await controller.create(dto);
    
    expect(createdCandidacy).toEqual({
      Candidacy_id : expect.any(Number),
    })

  })
});
