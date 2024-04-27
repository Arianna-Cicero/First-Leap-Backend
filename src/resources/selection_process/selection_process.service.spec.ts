import { Test, TestingModule } from '@nestjs/testing';
import { SelectionProcessService } from './selection_process.service';

describe('SelectionProcessService', () => {
  let service: SelectionProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionProcessService],
    }).compile();

    service = module.get<SelectionProcessService>(SelectionProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
