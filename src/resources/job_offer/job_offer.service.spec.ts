import { Test, TestingModule } from '@nestjs/testing';
import { JobOfferService } from './job_offer.service';

describe('JobOfferService', () => {
  let service: JobOfferService;

  const mockJobOfferService = {
    create: jest.fn(dto => ({
      JO_id: Date.now(),
      ...dto
    })),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    }))
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobOfferService],
    }).overrideProvider(JobOfferService).useValue(mockJobOfferService).compile();

    service = module.get<JobOfferService>(JobOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
