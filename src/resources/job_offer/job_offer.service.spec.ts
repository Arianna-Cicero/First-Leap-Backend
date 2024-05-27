import { Test, TestingModule } from '@nestjs/testing';
import { JobOfferService } from './job_offer.service';
import { EntityManager, Repository } from 'typeorm';
import { JobOffer } from './entities/job_offer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateJobOfferDto } from './dto/create-job_offer.dto';

describe('JobOfferService', () => {
  let service: JobOfferService;
  let jobofferRepository: Repository<JobOffer>;
  let entityManager : EntityManager;

  const mockJobOffer = {
    JO_id: 1,
    title: 'C# Junior',
    description: 'In this job you will:',
    requisites: 'Job Experience: 2 years',
    responsibilities: 'You will be responsible by:',
    benefits: 'Salary : 1200',
    status: 'Active',
    deadline: undefined,
    jobType: undefined,
  }

  const mockJobOfferRepository = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
  
  const mockEntityManager = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobOfferService,
        {
          provide: getRepositoryToken(JobOffer),
          useValue: mockJobOfferRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<JobOfferService>(JobOfferService);
    jobofferRepository = module.get<Repository<JobOffer>>(
      getRepositoryToken(JobOffer),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      jest.spyOn(jobofferRepository, 'find').mockResolvedValue([mockJobOffer]);

      const result = await service.findAll();

      expect(jobofferRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockJobOffer]);
    });
  });

  describe('update', () => {
    it('should update an offer and return the updated offer', async () => {
      const updatedJobOfferDto = { benefits: 'Health insurance' };
      const updatedJobOffer = { ...mockJobOffer, ...updatedJobOfferDto };
  
      jest.spyOn(jobofferRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(jobofferRepository, 'findOne').mockResolvedValue(updatedJobOffer);
  
      const result = await service.update(
        mockJobOffer.JO_id,
        updatedJobOfferDto,
      );
  
      expect(jobofferRepository.update).toHaveBeenCalledWith(
        mockJobOffer.JO_id,
        updatedJobOfferDto,
      );
      expect(jobofferRepository.findOne).toHaveBeenCalledWith({
        where: { JO_id: mockJobOffer.JO_id },
      });
      expect(result).toEqual(updatedJobOffer);
    });
  });

  describe('create', () => {
    it('should create a new offer', async () => {
      const createOfferDto: CreateJobOfferDto = {
        JO_id: 1,
        title: 'C# Junior',
        description: 'In this job you will:',
        requisites: 'Job Experience: 2 years',
        responsibilities: 'You will be responsible by:',
        benefits: 'Salary : 1200',
        status: 'Active',
        deadline: undefined,
      };
  
      console.log('Testing create method with DTO:', createOfferDto);
  
      const newOffer = {
        ...createOfferDto,
        jobType: undefined,
      };
  
      jest.spyOn(entityManager, 'save').mockResolvedValue(newOffer);
  
      const result = await service.create(createOfferDto);
  
      console.log('Result of create method:', result);
  
      expect(entityManager.save).toHaveBeenCalledWith(
        expect.objectContaining(createOfferDto),
      );
      expect(result).toEqual(newOffer);
    });
  });
});
