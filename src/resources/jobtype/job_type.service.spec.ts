import { Test, TestingModule } from '@nestjs/testing';
import { JobtypeService } from './job_type.service';
import { EntityManager, Repository } from 'typeorm';
import { JobType } from './entities/job_type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateJobTypeDto } from './dto/create-job_type.dto';

describe('JobtypeService', () => {
  let service: JobtypeService;
  let typeRepository: Repository<JobType>;
  let entityManager: EntityManager;

  const mockType = {
    type_id: 2,
    jobtype_desc: 'Estágio Profissional',
    jobOffers: undefined
  }

  const mockTypeRepository = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }

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
      providers: [JobtypeService,
        {
          provide: getRepositoryToken(JobType),
          useValue: mockTypeRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<JobtypeService>(JobtypeService);
    typeRepository = module.get<Repository<JobType>>(
      getRepositoryToken(JobType),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of types', async () => {
      jest.spyOn(typeRepository, 'find').mockResolvedValue([mockType]);

      const result = await service.findAll();

      expect(typeRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockType]);
    });
  })

  describe('update', () => {
    it('should update a type and return the updated type', async () => {
      const updatedTypeDto = { jobtype_desc: 'Emprego' };
      const updatedType = { ...mockType, ...updatedTypeDto };
  
      jest.spyOn(typeRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(typeRepository, 'findOne').mockResolvedValue(updatedType);
  
      const result = await service.update(
        mockType.type_id,
        updatedTypeDto,
      );
  
      expect(typeRepository.update).toHaveBeenCalledWith(
        mockType.type_id,
        updatedTypeDto,
      );
      expect(typeRepository.findOne).toHaveBeenCalledWith({
        where: { type_id: mockType.type_id },
      });
      expect(result).toEqual(updatedType);
    });
  });

  describe('create', () => {
    it('should create a new type', async () => {
      const createTypeDto: CreateJobTypeDto = {
        type_id: 1,
        jobtype_desc: 'Test type',
      };
  
      console.log('Testing create method with DTO:', createTypeDto);
  
      const newType = {
        ...createTypeDto,
        jobOffers: undefined,
      };
  
      jest.spyOn(entityManager, 'save').mockResolvedValue(newType);
  
      const result = await service.create(createTypeDto);
  
      console.log('Result of create method:', result);
  
      expect(entityManager.save).toHaveBeenCalledWith(
        expect.objectContaining(createTypeDto),
      );
      expect(result).toEqual(newType);
    });
  });
});
