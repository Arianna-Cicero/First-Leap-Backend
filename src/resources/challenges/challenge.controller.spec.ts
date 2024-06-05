import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

describe('ChallengesController', () => {
  let controller: ChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [ChallengeService],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
