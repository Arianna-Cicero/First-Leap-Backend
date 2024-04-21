import { Test, TestingModule } from '@nestjs/testing';
import { EmailverificationService } from './emailverification.service';

describe('EmailverificationService', () => {
  let service: EmailverificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailverificationService],
    }).compile();

    service = module.get<EmailverificationService>(EmailverificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
