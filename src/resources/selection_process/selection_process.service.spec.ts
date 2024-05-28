import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { SelectionProcess } from './entities/selection_process.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SelectionProcessService } from './selection_process.service';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';

describe('SelectionProcessController', () => {
  let service: SelectionProcessService;
  let processRepository: Repository<SelectionProcess>;
  let entityManager: EntityManager;

  const mockProcess = {
    SP_id: 2,
    description: 'Process of recruitment',
    vacancies: 2,
    phase: 'Phase test',
    starting_date: undefined,
    selectionPhases: undefined,
    recruiter: undefined,
    vacancy: undefined,
  }

  const mockProcessRepository = {
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
      providers: [SelectionProcessService,
        {
          provide: getRepositoryToken(SelectionProcess),
          useValue: mockProcessRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<SelectionProcessService>(SelectionProcessService);
    processRepository = module.get<Repository<SelectionProcess>>(
      getRepositoryToken(SelectionProcess),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Processs', async () => {
      jest.spyOn(processRepository, 'find').mockResolvedValue([mockProcess]);

      const result = await service.findAll();

      expect(processRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockProcess]);
    }); 
  })

  describe('update', () => {
    it('should update a phase and return the updated phase', async () => {
      const updatedPhaseDto = { description: 'Test' };
      const updatedPhase = { ...mockProcess, ...updatedPhaseDto };
  
      jest.spyOn(processRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(processRepository, 'findOne').mockResolvedValue(updatedPhase);
  
      const result = await service.update(
        mockProcess.SP_id,
        updatedPhaseDto,
      );
  
      expect(processRepository.update).toHaveBeenCalledWith(
        mockProcess.SP_id,
        updatedPhaseDto,
      );
      expect(processRepository.findOne).toHaveBeenCalledWith({
        where: { SP_id: mockProcess.SP_id,},
      });
      expect(result).toEqual(updatedPhaseDto);
    });
  });
  describe('create', () => {
    it('should create a new phase', async () => {
      const createProcessDto: CreateSelectionprocessDto = {
        SP_id: 2,
        description:'Testing',
        vacancies: 3,
        phase: 'Process test',
      };
  
      console.log('Testing create method with DTO:', createProcessDto);
  
      const newProcess = {
        ...createProcessDto,
        recruiter: undefined,
        vacancy: undefined,
        selectionPhases: undefined,
        starting_date: undefined,
      };
  
      jest.spyOn(processRepository, 'save').mockResolvedValue(newProcess);
  
      const result = await service.create(createProcessDto);
  
      console.log('Result of create method:', result);
  
      expect(processRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createProcessDto),
      );
      expect(result).toEqual(newProcess);
    });
  });
});
