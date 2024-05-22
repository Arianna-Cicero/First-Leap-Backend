import { Test, TestingModule } from '@nestjs/testing';
import { JobtypeService } from './job_type.service';

describe('JobtypeService', () => {
  let service: JobtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobtypeService],
    }).compile();

    service = module.get<JobtypeService>(JobtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
