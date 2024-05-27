import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from './result.service';
import { Result } from './entities/result.entity';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateResultDto } from './dto/create-result.dto';

describe('ResultService', () => {
  let service: ResultService;
  let resultRepository: Repository<Result>;
  let entityManager: EntityManager;

  const mockResult = {
    result_id: 2,
    result_desc: 'Test',
    comments: 'Test',
    evaluation_date: undefined,
    candidacy: undefined,
  };

  const mockResultRepository = {
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
      providers: [ResultService,
        {
          provide: getRepositoryToken(Result),
          useValue: mockResultRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<ResultService>(ResultService);
    resultRepository = module.get<Repository<Result>>(
      getRepositoryToken(Result),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Results', async () => {
      jest.spyOn(resultRepository, 'find').mockResolvedValue([mockResult]);

      const result = await service.findAll();

      expect(resultRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockResult]);
    }); 
  })

  describe('update', () => {
    it('should update a result and return the updated result', async () => {
      const updatedResultlDto = { result_desc: 'Test' };
      const updatedResult = { ...mockResult, ...updatedResultlDto };
  
      jest.spyOn(resultRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(resultRepository, 'findOne').mockResolvedValue(updatedResult);
  
      const result = await service.update(
        mockResult.result_id,
        updatedResultlDto,
      );
  
      expect(resultRepository.update).toHaveBeenCalledWith(
        mockResult.result_id,
        updatedResultlDto,
      );
      expect(resultRepository.findOne).toHaveBeenCalledWith({
        where: { result_id: mockResult.result_id,},
      });
      expect(result).toEqual(updatedResultlDto);
    });
  });

  describe('create', () => {
    it('should create a new result', async () => {
      const createResultDto: CreateResultDto = {
        result_id: 1,
        result_desc: 'Test ',
        comments: 'Testing',
        evaluation_date: undefined,
      };
  
      console.log('Testing create method with DTO:', createResultDto);
  
      const newResult = {
        ...createResultDto,
        candidacy: undefined,
      };
  
      jest.spyOn(resultRepository, 'save').mockResolvedValue(newResult);
  
      const result = await service.create(createResultDto);
  
      console.log('Result of create method:', result);
  
      expect(resultRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createResultDto),
      );
      expect(result).toEqual(newResult);
    });
  });
});
