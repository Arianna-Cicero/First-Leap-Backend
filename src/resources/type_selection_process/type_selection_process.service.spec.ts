import { Test, TestingModule } from '@nestjs/testing';
import { TypeSelectionProcessService } from './type_selection_process.service';

describe('TypeSelectionProcessService', () => {
  let service: TypeSelectionProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSelectionProcessService],
    }).compile();

    service = module.get<TypeSelectionProcessService>(TypeSelectionProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
