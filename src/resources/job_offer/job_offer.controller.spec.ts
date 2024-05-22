import { Test, TestingModule } from '@nestjs/testing';
import { JobOfferService } from './job_offer.service';
import { JobOfferController } from './job_offer.controller';
import { title } from 'process';

describe('JobOfferService', () => {
  let controller: JobOfferController;

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
      controllers: [JobOfferController],
      providers: [JobOfferService],
    }).overrideProvider(JobOfferService).useValue(mockJobOfferService).compile();

    controller = module.get<JobOfferController>(JobOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a offer', async () => {
    const dto = {
      JO_id: 1,
      title: 'C# Junior',
      description: 'In this job you will:',
      requisites: 'Job Experience: 2 years',
      responsibilities: 'You will be responsible by:',
      benefits: 'Salary : 1200',
      status: 'Active',
    }
    const createdJob = await controller.create(dto);
    expect(createdJob).toEqual({
      JO_id: expect.any(Number),
      title: dto.title,
      description: dto.description,
      requisites: dto.requisites,
      responsibilities: dto.responsibilities,
      benefits: dto.benefits,
      status: dto.status,
    })
    expect(mockJobOfferService.create).toHaveBeenCalledWith(dto);
  })
  it('should update a user', async () => {
    const dto = { title : 'JS junior'};
    const updatedJob = await controller.update('1', dto);

    expect(updatedJob).toEqual({
      id: 1,
      ...dto,
    })

    expect(mockJobOfferService.update).toHaveBeenCalledWith(1, dto);
  })
});
