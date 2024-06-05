import { Test, TestingModule } from '@nestjs/testing';
import { WrittenTestsService } from './written_tests.service';

describe('WrittenTestsService', () => {
  let service: WrittenTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WrittenTestsService],
    }).compile();

    service = module.get<WrittenTestsService>(WrittenTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
