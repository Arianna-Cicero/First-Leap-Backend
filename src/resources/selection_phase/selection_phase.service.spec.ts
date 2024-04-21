import { Test, TestingModule } from '@nestjs/testing';
import { SelectionPhaseService } from './selection_phase.service';

describe('SelectionPhaseService', () => {
  let service: SelectionPhaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionPhaseService],
    }).compile();

    service = module.get<SelectionPhaseService>(SelectionPhaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
